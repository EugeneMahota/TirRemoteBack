const user = require('../app/controllers/user');
const camera = require('../app/controllers/camera');
const auth = require('../app/controllers/auth');
const souvenir = require('../app/controllers/souvenir');
const gun = require('../app/controllers/gun');
const role = require('../app/controllers/role');
const person = require('../app/controllers/person');
const rele = require('../app/controllers/rele');
const gameTir = require('../app/controllers/game-tir');
const gameArcade = require('../app/controllers/game-arcade');
const gamePrize = require('../app/controllers/game-prize');
const position = require('../app/controllers/position');

const upload = require('../app/middleware/upload');
const authMiddleware = require('../app/middleware/auth');
const roles = require('../app/middleware/roles');

module.exports = (app) => {
    //position
    app.get('/position', authMiddleware, roles.position, position.getPosition);
    app.post('/position', authMiddleware, roles.position, position.postPosition);
    app.put('/position/:id', authMiddleware, roles.position, position.putPosition);
    app.delete('/position/:id', authMiddleware, roles.position, position.delPosition);
    app.get('/position/type-game', authMiddleware, roles.position, position.getTypeGame);

    //game-prize
    app.get('/game-prize', authMiddleware, roles.game, gamePrize.getGame);
    app.post('/game-prize', authMiddleware, roles.game, gamePrize.postGame);
    app.put('/game-prize/:id', authMiddleware, roles.game, gamePrize.putGame);
    app.delete('/game-prize/:id', authMiddleware, roles.game, gamePrize.delGame);
    app.get('/game-prize/position', authMiddleware, roles.game, gamePrize.getPosition);

    //game-souvenir
    app.get('/game-arcade', authMiddleware, roles.game, gameArcade.getGame);
    app.post('/game-arcade', authMiddleware, roles.game, upload.fields([{name: 'image'}, {name: 'audio_start'}, {name: 'audio_end'}]), gameArcade.postGame);
    app.put('/game-arcade/:id', authMiddleware, roles.game, upload.fields([{name: 'image', maxCount: 1}, {name: 'audio_start', maxCount: 1}, {name: 'audio_end', maxCount: 1}]), gameArcade.putGame);
    app.delete('/game-arcade/:id', authMiddleware, roles.game, gameArcade.delGame);
    app.get('/game-arcade/position', authMiddleware, roles.game, gameArcade.getPositionGame);

    //game-tir
    app.get('/game-tir', authMiddleware, roles.game, gameTir.getGame);
    app.post('/game-tir', authMiddleware, roles.game, upload.fields([{name: 'image'}, {name: 'audio_start'}, {name: 'audio_end'}]), gameTir.postGame);
    app.put('/game-tir/:id', authMiddleware, roles.game, upload.fields([{name: 'image', maxCount: 1}, {name: 'audio_start', maxCount: 1}, {name: 'audio_end', maxCount: 1}]), gameTir.putGame);
    app.delete('/game-tir/:id', authMiddleware, roles.game, gameTir.delGame);
    app.get('/game-tir/position', authMiddleware, roles.game, gameTir.getPositionGame);

    //rele
    app.get('/rele', authMiddleware, roles.listRele, rele.getRele);
    app.post('/rele', authMiddleware, roles.rele, rele.postRele);
    app.put('/rele/:id', authMiddleware, roles.rele, rele.putRele);
    app.delete('/rele/:id', authMiddleware, roles.rele, rele.delRele);

    //person
    app.get('/person', authMiddleware, roles.person, person.getPerson);
    app.post('/person', authMiddleware, roles.person, person.postPerson);
    app.put('/person/:id', authMiddleware, roles.person, person.putPerson);
    app.delete('/person/:id', authMiddleware, roles.person, person.delPerson);

    //roles
    app.get('/role', authMiddleware, role.getRole);
    app.get('/role/user/:id', authMiddleware, role.getRoleUser);

    //gun
    app.get('/gun', authMiddleware, roles.listGun, gun.getGun);
    app.post('/gun', authMiddleware, roles.gun, upload.fields([{name: 'image', maxCount: 1}, {name: 'audio', maxCount: 1}]), gun.postGun);
    app.put('/gun/:id', authMiddleware, roles.gun, upload.fields([{name: 'image', maxCount: 1}, {name: 'audio', maxCount: 1}]), gun.putGun);
    app.delete('/gun/:id', authMiddleware, roles.gun, gun.delGun);

    //souvenir
    app.get('/souvenir', authMiddleware, roles.listSouvenir, souvenir.getSouvenir);
    app.post('/souvenir', authMiddleware, roles.souvenir, souvenir.postSouvenir);
    app.put('/souvenir/:id', authMiddleware, roles.souvenir, souvenir.putSouvenir);
    app.delete('/souvenir/:id', authMiddleware, roles.souvenir, souvenir.delSouvenir);

    //user
    app.get('/user', authMiddleware, roles.user, user.getUser);
    app.post('/user', authMiddleware, roles.user, user.postUser);
    app.put('/user/:id', authMiddleware, roles.user, user.putUser);
    app.delete('/user/:id', authMiddleware, roles.user, user.delUser);
    app.post('/user/password', authMiddleware, roles.user, user.postPasswordUser);

    //camera
    app.get('/camera', authMiddleware, roles.listCamera, camera.getCamera);
    app.post('/camera', authMiddleware, roles.camera, camera.postCamera);
    app.put('/camera/:id', authMiddleware, roles.camera, camera.putCamera);
    app.delete('/camera/:id', authMiddleware, roles.camera, camera.delCamera);

    //auth
    app.post('/login', auth.signIn);
    app.post('/refresh', auth.refreshIn);
};