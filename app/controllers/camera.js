const connection = require('../../config/database');
const responseModel = require('../models/response');

const getCamera = (req, res) => {
    connection.query('CALL list_camers', (err, result) => {
        res.send(responseModel.responseData(err, result));
    });
};

const postCamera = (req, res) => {
    const camera = req.body;
    req.check('name', 'Минимальная длинна имени 3 символа!').isLength({min: 3});
    req.check('address', 'Неверный формат IP адреса!').isIP();
    const errors = req.validationErrors();
    if (!errors) {
        connection.query('CALL add_camera(?, ?)', [camera.address, camera.name], (err, result) => {
            res.send(responseModel.response(err, result));
        });
    } else {
        res.send(responseModel.errorValid(errors));
    }
};

const putCamera = (req, res) => {
    const camera = req.body;
    req.check('name', 'Минимальная длинна имени 3 символа!').isLength({min: 3});
    req.check('address', 'Неверный формат IP адреса!').isIP();
    const errors = req.validationErrors();
    if (!errors) {
        connection.query('CALL edit_camera(?, ?, ?)', [req.params.id, camera.address, camera.name], (err, result) => {
            res.send(responseModel.response(err, result));
        });
    } else {
        res.send(responseModel.errorValid(errors));
    }
};

const delCamera = (req, res) => {
    connection.query('CALL del_camera(?)', req.params.id, (err, result) => {
        res.send(responseModel.response(err, result));
    });
};


module.exports = {
    getCamera,
    postCamera,
    putCamera,
    delCamera
};