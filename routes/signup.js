const signupRouter = require('express').Router();
const { createUser } = require('../controllers/users');
const { signupValidation } = require('../middlewares/validation');

signupRouter.post('/', signupValidation, createUser);

module.exports = signupRouter;
