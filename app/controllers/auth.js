const connection = require('../../config/database');

const jwt = require('jsonwebtoken');
const {secret, tokens} = require('../../config/app').jwt;
const bCrypt = require('bcrypt');


const signIn = function (req, res) {
    var user, token;

    connection.query('CALL checking_user_login(?)', req.body.login)
        .then(result => {
            user = result[0][0];
            const isValid = bCrypt.compareSync(req.body.password, user.password);
            if (isValid) {
                const payload = {id: user.user_id, login: user.login, name: user.name, type: tokens.access.type};
                const options = {expiresIn: tokens.access.expiresIn};
                token = jwt.sign(payload, secret, options);
                return connection.query('CALL list_roles_user(?)', user.user_id);
            } else {
                return null;
            }
        })
        .then(result => {
            if (result) {
                const roles = result[0];
                res.send({status: 200, token: token, name: user.name, roles: roles});
            } else {
                res.send({status: 401, msg: 'Неверный пароль!'});
            }
        })
        .catch(err => {
            res.send({status: 500, msg: 'Ошибка авторизации!'});
        })
};


const refreshIn = (req, res) => {
    var user;

    var refresh = function () {
        const {token} = req.body;
        const verify = jwt.verify(token, secret);
        connection.query('CALL checking_user_id(?)', verify.id)
            .then(result => {
                user = result[0][0];
                if (user.user_id === verify.id) {
                    return connection.query('CALL list_roles_user(?)', verify.id);
                } else {
                    return null;
                }
            })
            .then(result => {
                if (result) {
                    var roles = result[0];
                    res.send({status: 200, name: user.name, roles: roles});
                } else {
                    res.send({status: 401, msg: 'Ошибка авторизации!'});
                }
            }).catch(err => {
            res.send({status: 500, msg: 'Ошибка авторизации! ' + err.message});
        });
    };

    try {
        refresh();
    } catch (err) {
        res.send({status: 500, msg: 'Ошибка авторизации! ' + err.message});
    }
};


module.exports = {
    signIn,
    refreshIn
};