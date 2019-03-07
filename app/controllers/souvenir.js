const connection = require('../../index');
const responseModel = require('../models/response');

const getSouvenir = (req, res) => {
    connection.query('CALL list_souv', (err, result) => {
        res.send(responseModel.responseData(err, result));
    });
};

const postSouvenir = (req, res) => {
    const souvenir = req.body;
    req.check('name', 'Минимальное количество символов имени: 3!').isLength({min: 3});
    req.check('quant', 'Количество сувениров должно быть числом!').isInt();
    const errors = req.validationErrors();
    if (!errors) {
        connection.query('CALL add_new_souv(?, ?)', [souvenir.name, souvenir.quant], (err, result) => {
           res.send(responseModel.response(err, result));
        });
    } else {
        res.send(responseModel.errorValid(errors));
    }
};

const putSouvenir = (req, res) => {
    const souvenir = req.body;
    req.check('name', 'Минимальное количество символов имени: 3!').isLength({min: 3});
    req.check('quant', 'Количество сувениров должно быть числом!').isInt();
    const errors = req.validationErrors();
    if (!errors) {
        connection.query('CALL edit_souv(?, ?, ?)', [req.params.id, souvenir.name, souvenir.quant], (err, result) => {
            res.send(responseModel.response(err, result));
        });
    } else {
        res.send(responseModel.errorValid(errors));
    }
};

const delSouvenir = (req, res) => {
    connection.query('CALL del_souv(?)', req.params.id, (err, result) => {
        res.send(responseModel.response(err, result));
    });
};

module.exports = {
    getSouvenir,
    postSouvenir,
    putSouvenir,
    delSouvenir
};