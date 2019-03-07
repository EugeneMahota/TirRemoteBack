const connection = require('../../index');
const responseModel = require('../models/response');
const {baseHref} = require('../../config/app');

const fs = require('fs');
const {promisify} = require('util');
const unlinkAsync = promisify(fs.unlink);

const getGame = (req, res) => {
    connection.query('CALL list_games_arcade', (err, result) => {
        res.send(responseModel.responseData(err, result));
    });
};

const postGame = (req, res) => {
    const game = JSON.parse(req.body.game);

    var game_id = (game.game_id === '' ? null : game.game_id);

    var image, audioStart, audioEnd;
    try {image = baseHref + req.files.image[0].path.replace('public\\', '')} catch (err) {image = ''}
    try {audioStart = baseHref + req.files.audio_start[0].path.replace('public\\', '')} catch (err) {audioStart = ''}
    try {audioEnd = baseHref + req.files.audio_end[0].path.replace('public\\', '')} catch (err) {audioEnd = ''}

    connection.query('CALL add_game_arcade(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [
            game_id,
            game.rele_start_id,
            game.rele_end_id,
            game.camera_start_id,
            game.camera_end_id,
            game.camera_multi_photo_id,
            game.type_souvenir_id,
            game.name,
            game.price,
            image,
            game.lasting_rele_start,
            game.lasting_rele_end,
            game.fl_display,
            audioStart,
            audioEnd,
            game.quant_photo,
            game.interval_photo,
            game.lasting_game,
            game.min_lasting_game
        ],
        (err, result) => {
        res.send(responseModel.response(err, result));
    });
};

const putGame = (req, res) => {
    const game = JSON.parse(req.body.game);

    var game_id = (game.game_id === '' ? null : game.game_id);

    var image, audioStart, audioEnd;
    try {
        image = baseHref + req.files.image[0].path.replace('public\\', '');
        unlinkAsync('public/' + game.image.replace(baseHref, ''));
    } catch (err) {
        image = game.image;
    }
    try {
        audioStart = baseHref + req.files.audio_start[0].path.replace('public\\', '');
        unlinkAsync('public/' + game.audio_start.replace(baseHref, ''));
    } catch (err) {
        audioStart = game.audio_start;
    }
    try {
        audioEnd = baseHref + req.files.audio_end[0].path.replace('public\\', '');
        unlinkAsync('public/' + game.audio_end.replace(baseHref, ''));
    } catch (err) {
        audioEnd = game.audio_end;
    }

    connection.query('CALL edit_game_arcade(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [
            req.params.id,
            game_id,
            game.rele_start_id,
            game.rele_end_id,
            game.camera_start_id,
            game.camera_end_id,
            game.camera_multi_photo_id,
            game.type_souvenir_id,
            game.name,
            game.price,
            image,
            game.lasting_rele_start,
            game.lasting_rele_end,
            game.fl_display,
            audioStart,
            audioEnd,
            game.quant_photo,
            game.interval_photo,
            game.lasting_game,
            game.min_lasting_game
        ],
        (err, result) => {
        res.send(responseModel.response(err, result));
    });
};

const delGame = (req, res) => {
    connection.query('CALL del_game_arcade(?)', req.params.id, (err, result) => {
        try {
            if(result[0][0]) {
                unlinkAsync('public/' + req.query.image.replace(baseHref, ''));
                unlinkAsync('public/' + req.query.audio_start.replace(baseHref, ''));
                unlinkAsync('public/' + req.query.audio_end.replace(baseHref, ''));
            }
        } catch (err) {}
        res.send(responseModel.response(err, result));
    });
};

const getPositionGame = (req, res) => {
    connection.query('CALL list_position_arcade', (err, result) => {
        res.send(responseModel.responseData(err, result));
    });
};

module.exports = {
    getGame,
    postGame,
    putGame,
    delGame,
    getPositionGame
};