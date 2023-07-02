const usersRouter = require('express').Router();
const { updateUserInfo, getCurrentUser, getUsers } = require('../controllers/users');
const { updateUserInfoValidation } = require('../middlewares/validation');

usersRouter.patch('/me', updateUserInfoValidation, updateUserInfo);
usersRouter.get('/me', getCurrentUser);
usersRouter.get('/', getUsers);

module.exports = usersRouter;
