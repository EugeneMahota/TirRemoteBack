const connection = require('../../index');

const jwt = require('jsonwebtoken');
const {secret, tokens} = require('../../config/app').jwt;
const bCrypt = require('bcrypt');


const signIn = function (req, res) {
    connection.query('CALL checking_user_login(?)', req.body.login, (err, result) => {
        try {
            const user = result[0][0];
            if (user.status) {
                const isValid = bCrypt.compareSync(req.body.password, user.password);
                if (isValid) {
                    const payload = {id: user.user_id, login: user.login, name: user.name, type: tokens.access.type};
                    const options = {expiresIn: tokens.access.expiresIn};
                    const token = jwt.sign(payload, secret, options);
                    connection.query('CALL list_roles_user(?)', user.user_id, (err, result) => {
                        const roles = result[0];
                        res.send({status: 200, token: token, name: user.name, roles: roles});
                    });
                } else {
                    res.send({status: 401, msg: 'Ошибка авторизации!'});
                }
            } else {
                res.send({status: 401, msg: 'Ошибка авторизации!'});
            }
        } catch (err) {
            res.send({status: 500, msg: 'Ошибка сервера!'});
        }
    });
};

const refreshIn = (req, res) => {
    const {token} = req.body;
    if (token) {
        try {
            const user = jwt.verify(token, secret);
            connection.query('CALL checking_user_id(?)', user.id, (err, result) => {
                const user = result[0][0];
                if (user.user_id) {
                    connection.query('CALL list_roles_user(?)', user.user_id, (err, result) => {
                        const roles = result[0];
                        res.send({status: 200, name: user.name, roles: roles});
                    });
                } else {
                    res.send({status: 400, msg: 'Пользователя не существует!'});
                }
            });
        } catch (err) {
            res.send({status: 401, msg: 'Ошибка авторизации!'});
        }
    } else {
        res.send({status: 401, msg: 'Ошибка авторизации!'});
    }
};


module.exports = {
    signIn,
    refreshIn
};