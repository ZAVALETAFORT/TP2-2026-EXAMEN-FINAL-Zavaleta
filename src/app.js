const express = require('express');
const crearDaos = require('./factories/daoFactory');
const crearCasosDeUso = require('./factories/useCaseFactory');
const crearLecturasController = require('./controllers/lecturasController');
const crearSensoresController = require('./controllers/sensoresController');
const crearAlertasController = require('./controllers/alertasController');
const crearLecturasRoutes = require('./routes/lecturasRoutes');
const crearSensoresRoutes = require('./routes/sensoresRoutes');
const crearAlertasRoutes = require('./routes/alertasRoutes');
const { rutaNoEncontrada, manejarErrores } = require('./middlewares/manejarErrores');

function crearApp() {
  const app = express();
  const casosDeUso = crearCasosDeUso(crearDaos());

  app.use(express.json());
  app.use('/lecturas', crearLecturasRoutes(crearLecturasController(casosDeUso.registrarLectura)));
  app.use('/sensores', crearSensoresRoutes(crearSensoresController(casosDeUso.listarSensores)));
  app.use('/alertas', crearAlertasRoutes(crearAlertasController(casosDeUso.listarAlertas)));
  app.use(rutaNoEncontrada);
  app.use(manejarErrores);

  return app;
}

module.exports = crearApp;
