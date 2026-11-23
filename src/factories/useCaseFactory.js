const RegistrarLectura = require('../usecases/RegistrarLectura');
const ListarSensores = require('../usecases/ListarSensores');
const ListarAlertas = require('../usecases/ListarAlertas');

function crearCasosDeUso(daos) {
  return {
    registrarLectura: new RegistrarLectura(daos.sensores, daos.alertas),
    listarSensores: new ListarSensores(daos.sensores),
    listarAlertas: new ListarAlertas(daos.alertas)
  };
}

module.exports = crearCasosDeUso;
