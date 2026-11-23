const { Router } = require('express');
const validarBodyLectura = require('../middlewares/validarBodyLectura');

function crearLecturasRoutes(controller) {
  const router = Router();
  router.post('/', validarBodyLectura, controller.registrar);
  return router;
}

module.exports = crearLecturasRoutes;
