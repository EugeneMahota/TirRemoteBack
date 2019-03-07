const connection = require('../../index');
const responseModel = require('../models/response');


const getRole = (req, res) => {
    connection.query('CALL list_roles', (err, result) => {
        res.send(responseModel.responseData(err, result));
    });
};

const getRoleUser = (req, res) => {
    connection.query('CALL list_roles_user(?)', req.params.id, (err, result) => {
        res.send(responseModel.responseData(err, result));
    });
};

module.exports = {
    getRole,
    getRoleUser
};