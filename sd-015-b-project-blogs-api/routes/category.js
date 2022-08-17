const express = require('express');
const categoryControllers = require('../controllers/categoryControllers');

const middlewares = require('../middlewares');

const router = express.Router();

router.post('/', middlewares.authCheck, categoryControllers.add);
router.get('/', middlewares.authCheck, categoryControllers.getAll);

module.exports = router;
