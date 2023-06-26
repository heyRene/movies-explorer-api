const CORS_ALLOWED = [
  'http://localhost:3000',
  'https://heyrene.nomoredomains.monster',
  'https://api.heyrene.nomoredomains.monster',
  'http://api.heyrene.nomoredomains.monster',
  'http://heyrene.nomoredomains.monster',
];

const handleCors = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (CORS_ALLOWED.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};

module.exports = { handleCors };
