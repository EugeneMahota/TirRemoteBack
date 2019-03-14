const connection = require('../../config/database');
const responseModel = require('../models/response');

const getTypeGame = (req, res) => {
    connection.query('CALL list_type_games', (err, result) => {
        res.send(responseModel.responseData(err, result));
    });
};

const getPosition = (req, res) => {
    connection.query('CALL list_position_type_games', (err, result) => {
        res.send(responseModel.responseData(err, result));
    });
};

const postPosition = (req, res) => {
    const position = req.body;

    req.check('id', 'Поле номер не должно быть пустым!').notEmpty();
    req.check('type', 'Поле тип не должно быть пустым!').notEmpty();

    const errors = req.validationErrors();

    if(!errors) {
        connection.query('CALL add_position_type_game(?,?)', [position.id, position.type], (err, result) => {
            res.send(responseModel.response(err, result));
        });
    } else {
        res.send(responseModel.errorValid(errors));
    }
};

const putPosition = (req, res) => {
    const position = req.body;

    req.check('id', 'Поле номер не должно быть пустым!').notEmpty();
    req.check('type', 'Поле тип не должно быть пустым!').notEmpty();

    const errors = req.validationErrors();

    if(!errors) {
        connection.query('CALL edit_position_type_game(?,?,?)', [req.params.id, position.id, position.type], (err, result) => {
            res.send(responseModel.response(err, result));
        });
    } else {
        res.send(responseModel.errorValid(errors));
    }
};

const delPosition = (req, res) => {
    connection.query('CALL del_position_type_game(?)', req.params.id, (err, result) => {
        res.send(responseModel.response(err, result));
    });
};

module.exports = {
    getTypeGame,
    getPosition,
    postPosition,
    putPosition,
    delPosition
};
