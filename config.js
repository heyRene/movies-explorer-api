require('dotenv').config();

const { MONGO } = process.env;

const { MONGO_URL = MONGO || 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

module.exports = { MONGO_URL };
