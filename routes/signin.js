const signinRouter = require('express').Router();
const { login } = require('../controllers/users');
const { signinValidation } = require('../middlewares/validation');

signinRouter.post('/', signinValidation, login);

module.exports = signinRouter;
