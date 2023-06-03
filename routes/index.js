const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const signinRouter = require('./signin');
const signupRouter = require('./signup');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use('/signup', signupRouter);
router.use('/signin', signinRouter);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError(`Запрашиваемый ресурс по адресу '${req.path}' не найден`));
});

module.exports = router;
