const { Router } = require('express');

function crearSensoresRoutes(controller) {
  const router = Router();
  router.get('/', controller.listar);
  return router;
}

module.exports = crearSensoresRoutes;
