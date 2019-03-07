const connection = require('../../index');
const responseModel = require('../models/response');
const bCrypt = require('bcrypt');

const getUser = (req, res) => {
    connection.query('CALL list_users', (err, result) => {
        res.send(responseModel.responseData(err, result));
    });
};

const delUser = (req, res) => {
    connection.query('CALL del_user(?)', req.params.id, (err, result) => {
        res.send(responseModel.response(err, result));
    });
};

const putUser = (req, res) => {
    const user = req.body;
    req.check('name', 'Минимальное количество символов имени: 3!').isLength({min: 3});
    if (user.email) {
        req.check('email', 'Электронная почта введена неверно!').isEmail();
    }
    if (user.phone) {
        req.check('phone', 'Неверный формат номера телефона!').isInt().isLength({min: 11});
    }
    const errors = req.validationErrors();
    if (!errors) {
        connection.query('CALL edit_user(?, ?, ?, ?)', [req.params.id, user.name, user.email, user.phone], (err, result) => {
            try {
                if(result[0][0].status) {
                    connection.query('CALL del_roles(?)', user.id, (err, result) => {
                        if(result[0][0].status) {
                            for(let i = 0; user.roles.length > i; i++) {
                                connection.query('CALL add_roles(?,?)', [user.id, user.roles[i].id], (err, result) => {
                                    if (err)
                                        throw err
                                });
                            }
                        }
                    })
                }
                res.send(responseModel.response(err, result));
            } catch (err) {
                res.send({status: 500, msg: 'Ошибка добавления ролей!'});
            }

        });
    } else {
        res.send(responseModel.errorValid(errors));
    }
};

const postUser = (req, res) => {
    const user = req.body;
    if (user.email) {
        req.check('email', 'Электронная почта введена неверно!').isEmail();
    }
    if (user.phone) {
        req.check('phone', 'Неверный формат номера телефона!').isInt().isLength({min: 11});
    }
    req.check('name', 'Минимальное количество символов имени: 3!').isLength({min: 3});
    req.check('login', 'Минимальное количество символов логина: 3!').isLength({min: 3});
    req.check('password', 'Минимальное количество символов пароля: 4!').isLength({min: 4});
    const errors = req.validationErrors();
    if (!errors) {
        connection.query('CALL add_user(?, ?, ?, ?, ?)', [user.login, user.name, user.email, user.phone, bCrypt.hashSync(user.password, 10)], (err, result) => {
            if(result[0][0].status) {
                for(let i = 0; user.roles.length > i; i++) {
                    connection.query('CALL add_roles(?,?)', [result[0][0].id, user.roles[i].id], (err, result) => {
                        if (err)
                            throw err
                    });
                }
            }
            res.send(responseModel.response(err, result));
        });
    } else {
        res.send(responseModel.errorValid(errors));
    }

};

const postPasswordUser = (req, res) => {
    const user = req.body;
    req.check('password', 'Минимальная длинна пароля, 4 символа!').isLength({min: 4});
    const errors = req.validationErrors();
    if (!errors) {
        connection.query('CALL change_pass_user(?, ?)', [user.id, bCrypt.hashSync(user.password, 10)], (err, result) => {
            res.send(responseModel.response(err, result));
        });
    } else {
        res.send(responseModel.errorValid(errors));
    }
};


module.exports = {
    getUser,
    delUser,
    putUser,
    postUser,
    postPasswordUser
};

