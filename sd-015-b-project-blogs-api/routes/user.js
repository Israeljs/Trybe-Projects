const express = require('express');
const userControllers = require('../controllers/userControllers');

const middlewares = require('../middlewares');

const validator = [
  middlewares.nameValidate,
  middlewares.hasEmail,
  middlewares.emailValid,
  middlewares.hasPassword,
  middlewares.passwordLenthValid,
];

const router = express.Router();

router.post('/', validator, userControllers.add);
router.get('/', middlewares.authCheck, userControllers.getAll);
router.get('/:id', middlewares.authCheck, userControllers.getById);
router.delete('/me', middlewares.authCheck, userControllers.remove);

module.exports = router;
