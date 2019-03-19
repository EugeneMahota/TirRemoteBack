const connection = require('../../config/database');
const jwt = require('jsonwebtoken');
const {secret} = require('../../config/app').jwt;

const reportGame   = (req, res, next) => {checkingRole(req, res, 'reportGame',    next);};

const reportEvent  = (req, res, next) => {checkingRole(req, res, 'reportEvent',   next);};

const reportUser   = (req, res, next) => {checkingRole(req, res, 'reportUser',    next);};

const position     = (req, res, next) => {checkingRole(req, res, 'position',      next);};

const user         = (req, res, next) => {checkingRole(req, res, 'user',          next);};

const person       = (req, res, next) => {checkingRole(req, res, 'person',        next);};

const gun          = (req, res, next) => {checkingRole(req, res, 'gun',           next);};

const rele         = (req, res, next) => {checkingRole(req, res, 'rele',          next);};

const souvenir     = (req, res, next) => {checkingRole(req, res, 'souvenir',      next);};

const camera       = (req, res, next) => {checkingRole(req, res, 'camera',        next);};

const game         = (req, res, next) => {checkingRole(req, res, 'game',          next);};

const listGun      = (req, res, next) => {checkingRole(req, res, 'list_gun',      next);};

const listRele     = (req, res, next) => {checkingRole(req, res, 'list_rele',     next);};

const listSouvenir = (req, res, next) => {checkingRole(req, res, 'list_souvenir', next);};

const listCamera   = (req, res, next) => {checkingRole(req, res, 'list_camera',   next);};



const checkingRole = (req, res, role, next) => {
    const token = req.get('Authorization');
    const user = jwt.verify(token, secret);

    connection.query('CALL list_roles_user(?)', user.id, (err, result) => {
        const roles = result[0];
        if(roles.find(x => x.code === role)) {
            next()
        } else {
            res.send({status: 400, msg: 'Нет доступа к объекту!'});
        }
    });
};


module.exports = {
    camera,
    user,
    person,
    gun,
    rele,
    game,
    souvenir,
    listGun,
    listRele,
    listSouvenir,
    listCamera,
    position,
    reportGame,
    reportEvent,
    reportUser
};