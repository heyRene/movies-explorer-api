require('dotenv').config();
const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const router = require('./routes');
const handleErrors = require('./middlewares/handleErrors');
const limiter = require('./middlewares/rateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_URL } = require('./config');
const corsOption = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();
app.use(corsOption);
// app.use(cors());
// app.options('*', cors());
app.use(requestLogger);
mongoose.connect(MONGO_URL);

app.use(helmet());

app.use(limiter);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
