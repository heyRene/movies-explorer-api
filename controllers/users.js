const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const UserExistError = require('../errors/UserExistError');
const ValidationError = require('../errors/ValidationError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new UnauthorizedError('Пользователь по указанному email не найден');
    })
    .then(async (user) => {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
        res.send({ token });
      } else {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
    })
    .catch((err) => {
      if (err instanceof UnauthorizedError) {
        next(err);
      } else {
        next(new Error('Ошибка при аутентификации пользователя'));
      }
    });
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email: req.body.email,
        password: hash,
        name: req.body.name,
      })
        .then((newUser) => {
          res.status(201).send({ newUser });
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new UserExistError('Пользователь с таким email уже существует'));
          } else if (err.name === 'ValidationError') {
            next(new ValidationError('Переданы некорректные данные'));
          } else {
            next(err);
          }
        });
    });
};

const updateUserInfo = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;
  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  updateUserInfo,
  login,
  getUsers,
  // getUserId,
  getCurrentUser,
};
