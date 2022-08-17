const authCheck = require('./authCheck');
const errorHander = require('./errorHander');
const nameValidate = require('./nameValidate');
const emailNotEmpty = require('./emailNotEmpty');
const hasEmail = require('./hasEmail');
const emailValid = require('./emailValid');
const passwordLenthValid = require('./passwordLenthValid');
const passwordNotEmpty = require('./passwordNotEmpty');
const hasPassword = require('./hasPassword');
const postFildValidation = require('./postFieldValidation');
const categoryIdValidation = require('./categoryIdValidation');
const postFildUpdateValidation = require('./postFildUpdateValidation');
const userAuthorizetion = require('./userAuthorizetion');
const isPost = require('./isPost');

module.exports = {
  authCheck,
  errorHander,
  nameValidate,
  emailNotEmpty,
  hasEmail,
  emailValid,
  passwordLenthValid,
  passwordNotEmpty,
  hasPassword,
  postFildValidation,
  categoryIdValidation,
  postFildUpdateValidation,
  userAuthorizetion,
  isPost,
};
