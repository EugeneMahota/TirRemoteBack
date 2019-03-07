const connection = require('../../index');
const responseModel = require('../models/response');

const getRele = (req, res) => {
    connection.query('CALL list_rele', (err, result) => {
        res.send(responseModel.responseData(err, result));
    });
};

const postRele = (req, res) => {
    const rele = req.body;

    req.check('name', 'Минимальная длинна имени 3 символа!').isLength({min: 3});

    const errors = req.validationErrors();

    if (!errors) {
        connection.query('CALL add_rele(?)', rele.name, (err, result) => {
            res.send(responseModel.response(err, result));
        });
    } else {
        res.send(responseModel.errorValid(errors));
    }
};

const putRele = (req, res) => {
    const rele = req.body;

    req.check('name', 'Минимальная длинна имени 3 символа!').isLength({min: 3});

    const errors = req.validationErrors();

    if (!errors) {
        connection.query('CALL edit_rele(?, ?)', [req.params.id, rele.name], (err, result) => {
            res.send(responseModel.response(err, result));
        });
    } else {
        res.send(responseModel.errorValid(errors));
    }
};

const delRele = (req, res) => {
    connection.query('CALL del_rele(?)', req.params.id, (err, result) => {
        res.send(responseModel.response(err, result));
    });
};

module.exports = {
    getRele,
    postRele,
    putRele,
    delRele
};