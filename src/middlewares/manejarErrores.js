const ErrorValidacion = require('../errors/ErrorValidacion');

function rutaNoEncontrada(req, res) {
  res.status(404).json({ errorMsg: 'Ruta no encontrada' });
}

function manejarErrores(error, req, res, next) {
  if (error instanceof ErrorValidacion || error.type === 'entity.parse.failed') {
    return res.status(400).json({
      errorMsg: error instanceof ErrorValidacion ? error.message : 'JSON invalido'
    });
  }

  console.error(error);
  return res.status(500).json({ errorMsg: 'Error interno del servidor' });
}

module.exports = { rutaNoEncontrada, manejarErrores };
