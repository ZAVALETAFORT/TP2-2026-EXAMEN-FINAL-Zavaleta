const { Router } = require('express');

function crearAlertasRoutes(controller) {
  const router = Router();
  router.get('/', controller.listar);
  return router;
}

module.exports = crearAlertasRoutes;
