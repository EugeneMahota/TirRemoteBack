const connection = require('../../index');
const responseModel = require('../models/response');

const getGame = (req, res) => {
    connection.query('CALL list_games_prize', (err, result) => {
        res.send(responseModel.responseData(err, result));
    });
};

const postGame = (req, res) => {
    const game = req.body;

    req.check('name', 'Минимальная длинна имени 3 символа!').isLength({min: 3});
    req.check('price', 'Поле "цена" не должно быть пустым!').notEmpty();
    req.check('souvenirId', 'Поле "сувенир" не должно быть пустым!').notEmpty();
    req.check('positionId', 'Поле "позиция" не должно быть пустым!').notEmpty();

    const errors = req.validationErrors();

    if(!errors) {
        connection.query('CALL add_game_prize(?,?,?,?)', [game.positionId, game.souvenirId, game.name, game.price], (err, result) => {
            res.send(responseModel.response(err, result));
        });
    } else {
        res.send(responseModel.errorValid(errors));
    }
};

const putGame = (req, res) => {
    const game = req.body;

    req.check('name', 'Минимальная длинна имени 3 символа!').isLength({min: 3});
    req.check('price', 'Поле "цена" не должно быть пустым!').notEmpty();
    req.check('souvenirId', 'Поле "сувенир" не должно быть пустым!').notEmpty();
    req.check('positionId', 'Поле "позиция" не должно быть пустым!').notEmpty();

    const errors = req.validationErrors();

    if(!errors) {
        connection.query('CALL edit_game_prize(?,?,?,?,?)', [req.params.id, game.positionId, game.souvenirId, game.name, game.price], (err, result) => {
            res.send(responseModel.response(err, result));
        });
    } else {
        res.send(responseModel.errorValid(errors));
    }
};

const delGame = (req, res) => {
    connection.query('CALL del_game_prize(?)', req.params.id, (err, result) => {
        res.send(responseModel.response(err, result));
    });
};

const getPosition = (req, res) => {
    connection.query('CALL list_position_prize', (err, result) => {
        res.send(responseModel.responseData(err, result));
    });
};

module.exports = {
    getGame,
    postGame,
    putGame,
    delGame,
    getPosition
};