const SensorDaoMemoria = require('../dao/SensorDaoMemoria');
const AlertaDaoMemoria = require('../dao/AlertaDaoMemoria');

function crearDaos() {
  return {
    sensores: new SensorDaoMemoria(),
    alertas: new AlertaDaoMemoria()
  };
}

module.exports = crearDaos;
