const { Router } = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const validateLogin = [
  middlewares.validatePassword,
  middlewares.validateEmail,
];

const validations = [
  middlewares.auth,
  middlewares.validateName,
  middlewares.validateAge,
  middlewares.validateTalk,
  middlewares.validateRate,
  middlewares.validateDate,
];

const router = Router();

router.get('/talker', controllers.getAllTalker);

router.get('/talker/search', middlewares.auth, controllers.searchTalker);

router.get('/talker/:id', controllers.getTalkerById);

router.post('/login', validateLogin, controllers.createToken);

router.post('/talker', validations, controllers.createTalker);

router.put('/talker/:id', validations, controllers.updateTalker);

router.delete('/talker/:id', middlewares.auth, controllers.deleteTalker);

module.exports = router;
