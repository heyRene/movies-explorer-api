// const CORS_ALLOWED = [
//   'http://localhost:3000',
//   'https://localhost:3000',
//   'https://api.movie-heyrene.nomoredomains.rocks',
//   'http://api.movie-heyrene.nomoredomains.rocks',
//   'https://movie-heyrene.nomoredomains.rocks',
//   'http://movie-heyrene.nomoredomains.rocks',
// ];

const handleCors = (req, res, next) => {
  // const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  res.header('Access-Control-Allow-Credentials', '*');
  // res.header('Access-Control-Allow-Origin', origin);
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};

module.exports = handleCors;
