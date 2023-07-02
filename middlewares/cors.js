// const CORS_ALLOWED = [
//   'localhost:3000',
//   'https://api.movie-heyrene.nomoredomains.rocks',
//   'http://api.movie-heyrene.nomoredomains.rocks',
//   'https://movie-heyrene.nomoredomains.rocks',
//   'http://movie-heyrene.nomoredomains.rocks',
// ];

module.exports = (req, res, next) => {
  // const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  // if (CORS_ALLOWED.includes(origin)) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', '*');
  // }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};

// const CORS_WHITELIST = ['http://localhost:3000',
//   'https://localhost:3000',
//   // 'https://api.movie-heyrene.nomoredomains.rocks',
//   // 'http://api.movie-heyrene.nomoredomains.rocks',
//   'https://movie-heyrene.nomoredomains.rocks',
//   'http://movie-heyrene.nomoredomains.rocks',
// ];

// const corsOption = {
//   credentials: true,
//   origin: function checkCorsList(origin, callback) {
//     if (CORS_WHITELIST.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

// module.exports = corsOption;
