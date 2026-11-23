const ErrorValidacion = require('../errors/ErrorValidacion');

function validarBodyLectura(req, res, next) {
  if (req.body === null || typeof req.body !== 'object' || Array.isArray(req.body)) {
    return next(new ErrorValidacion('El body debe ser un objeto JSON'));
  }
  next();
}

module.exports = validarBodyLectura;
