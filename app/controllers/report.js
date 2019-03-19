const connection = require('../../config/database');
const responseModel = require('../models/response');

const reportEvent = (req, res) => {
    const data = req.body;

    req.check('dateStart', 'Неверный формат даты старта!').notEmpty();
    req.check('dateEnd', 'Неверный формат даты окончания!').notEmpty();

    const errors = req.validationErrors();

    var dateStart = new Date(+data.dateStart);
    var dateEnd = new Date(+data.dateEnd);

    if(!errors) {
        connection.query('CALL report_events(?,?)', [dateStart, dateEnd])
            .then(result => {
                res.send(responseModel.responseData(null, result));})
            .catch(err => {
                res.send(responseModel.responseData(err, null));
            });
    } else {
        res.send(responseModel.errorValid(errors));
    }
};

const reportGame = (req, res) => {
    const data = req.body;

    req.check('dateStart', 'Неверный формат даты старта!').notEmpty();
    req.check('dateEnd', 'Неверный формат даты окончания!').notEmpty();

    const errors = req.validationErrors();

    var dateStart = new Date(+data.dateStart);
    var dateEnd = new Date(+data.dateEnd);

    if(!errors) {
        connection.query('CALL report_games(?,?)', [dateStart, dateEnd])
            .then(result => {
                res.send(responseModel.responseData(null, result));})
            .catch(err => {
                res.send(responseModel.responseData(err, null));
            });
    } else {
        res.send(responseModel.errorValid(errors));
    }
};

const reportUser = (req, res) => {
    const data = req.body;

    req.check('dateStart', 'Неверный формат даты старта!').notEmpty();
    req.check('dateEnd', 'Неверный формат даты окончания!').notEmpty();

    const errors = req.validationErrors();

    var dateStart = new Date(+data.dateStart);
    var dateEnd = new Date(+data.dateEnd);

    if(!errors) {
        connection.query('CALL report_users(?,?)', [dateStart, dateEnd])
            .then(result => {
                res.send(responseModel.responseData(null, result));})
            .catch(err => {
                res.send(responseModel.responseData(err, null));
            });
    } else {
        res.send(responseModel.errorValid(errors));
    }
};

module.exports = {
    reportEvent,
    reportGame,
    reportUser
};
