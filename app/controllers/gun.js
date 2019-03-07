const connection = require('../../index');
const responseModel = require('../models/response');
const {baseHref} = require('../../config/app');

const fs = require('fs');
const {promisify} = require('util');
const unlinkAsync = promisify(fs.unlink);


const getGun = (req, res) => {
    connection.query('CALL list_guns', (err, result) => {
        res.send(responseModel.responseData(err, result));
    });
};

const postGun = (req, res) => {
    req.check('name', 'Минимальное количество символов имени: 3!').isLength({min: 3});
    req.check('voltage', 'Поле напряжение не должно быть пустым!').not().isEmpty();

    var image, audio;
    try {image = baseHref + req.files.image[0].path.replace('public\\', '');} catch (e) {
        image = '';}
    try {audio = baseHref + req.files.audio[0].path.replace('public\\', '');} catch (e) {
        audio = '';}

    const errors = req.validationErrors();
    if (!errors) {
        connection.query('CALL add_gun(?, ?, ?, ?)',
            [req.query.name, image, req.query.voltage, audio], (err, result) => {
                res.send(responseModel.response(err, result));
            });
    } else {
        res.send(responseModel.errorValid(errors));
    }
};

const putGun = (req, res) => {
    req.check('name', 'Минимальное количество символов имени: 3!').isLength({min: 3});
    req.check('voltage', 'Поле напряжение не должно быть пустым!').not().isEmpty();

    var image, audio;
    try {image = baseHref + req.files.image[0].path.replace('public\\', '');} catch (e) {
        image = req.query.image;}
    try {audio = baseHref + req.files.audio[0].path.replace('public\\', '');} catch (e) {
        audio = req.query.audio;}

    const errors = req.validationErrors();
    if (!errors) {
        connection.query('CALL edit_gun(?, ?, ?, ?, ?)',
            [req.params.id, req.query.name, image, req.query.voltage, audio], (err, result) => {
                try {
                    if (result[0][0].status) {
                        if(image !== req.query.image) {
                            unlinkAsync('public/' + req.query.image.replace(baseHref, ''));
                        }
                        if(audio !== req.query.audio) {
                            unlinkAsync('public/' + req.query.audio.replace(baseHref, ''));
                        }
                    }
                } catch (e) {}
                res.send(responseModel.response(err, result));
            });
    } else {
        res.send(responseModel.errorValid(errors));
    }
};


const delGun = (req, res) => {
    connection.query('CALL del_gun(?)', req.params.id, (err, result) => {
        try {
            if (result[0][0].status) {
                unlinkAsync('public/' + req.query.image.replace(baseHref, ''));
                unlinkAsync('public/' + req.query.audio.replace(baseHref, ''));
            }
        } catch (e) {}
        res.send(responseModel.response(err, result));
    });
};

module.exports = {
    getGun,
    postGun,
    putGun,
    delGun
};