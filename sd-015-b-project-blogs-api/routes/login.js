const express = require('express');
const loginControllers = require('../controllers/loginControllers');

const middlewares = require('../middlewares');

const validator = [
  middlewares.emailNotEmpty,
  middlewares.hasEmail,
  middlewares.passwordNotEmpty,
  middlewares.hasPassword,
];

const router = express.Router();

router.post('/', validator, loginControllers.login);

module.exports = router;
