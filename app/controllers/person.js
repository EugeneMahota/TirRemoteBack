const connection = require('../../config/database');
const responseModel = require('../models/response');


const getPerson = (req, res) => {
    connection.query('CALL list_persons', (err, result) => {
        res.send(responseModel.responseData(err, result));
    });
};

const postPerson = (req, res) => {
    const person = req.body;

    req.check('login', 'Минимальная длинна логина: 3 символов!').isLength({min: 3});
    req.check('name', 'Минимальная длинна имени: 3 символов!').isLength({min: 3});
    req.check('pin', 'Минимальная длинна пинкода: 4 символов!').isLength({min: 4});
    req.check('code_card', 'Код карты не должен быть пустым!!').not().isEmpty();

    const errors = req.validationErrors();

    if (!errors) {
        connection.query('CALL add_person(?,?,?,?)', [person.login, person.name, person.pin, person.code_card], (err, result) => {
            res.send(responseModel.response(err, result));
        });
    } else {
        res.send(responseModel.errorValid(errors))
    }
};

const putPerson = (req, res) => {
    const person = req.body;

    req.check('name', 'Минимальная длинна имени: 3 символов!').isLength({min: 3});
    req.check('code_card', 'Код карты не должен быть пустым!!').not().isEmpty();

    const errors = req.validationErrors();

    if (!errors) {
        connection.query('CALL edit_person(?,?,?)', [req.params.id, person.name, person.code_card], (err, result) => {
            res.send(responseModel.response(err, result));
        });
    } else {
        res.send(responseModel.errorValid(errors))
    }
};

const delPerson = (req, res) => {
    connection.query('CALL del_person(?)', req.params.id, (err, result) => {
        res.send(responseModel.response(err, result));
    });
};

module.exports = {
    getPerson,
    postPerson,
    putPerson,
    delPerson
};