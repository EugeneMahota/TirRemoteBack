const jwt = require('jsonwebtoken');
const {secret} = require('../../config/app').jwt;
const connection = require('../../config/database');

module.exports = (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        res.sendStatus(401);
    } else {
        try {
            const user = jwt.verify(token, secret);
            checkingUser(user.id, res, next);

        } catch (err) {
            if (err instanceof jwt.JsonWebTokenError) {
                res.sendStatus(401);
            }
        }
    }
};

const checkingUser = (id, res, next) => {
    connection.query('CALL checking_user_id(?)', id, (err, result) => {
        const user = result[0][0];
        if (user.user_id) {
            next();
        } else {
            res.sendStatus(401);
        }
    });
};