const express = require('express');
const blogPostControllers = require('../controllers/blogPostControllers');

const middlewares = require('../middlewares');

const generalValidator = [
  middlewares.authCheck,
  middlewares.postFildValidation,
  middlewares.categoryIdValidation,
];

const updateValidator = [
  middlewares.authCheck,
  middlewares.userAuthorizetion,
  middlewares.postFildUpdateValidation,
];

const deleteValidator = [
  middlewares.authCheck,
  middlewares.isPost,
  middlewares.userAuthorizetion,
];

const router = express.Router();

router.post('/', generalValidator, blogPostControllers.add);
router.get('/search', middlewares.authCheck, blogPostControllers.search);
router.get('/', middlewares.authCheck, blogPostControllers.getAll);
router.get('/:id', middlewares.authCheck, blogPostControllers.getById);
router.put('/:id', updateValidator, blogPostControllers.updatePost);
router.delete('/:id', deleteValidator, blogPostControllers.remove);

module.exports = router;
