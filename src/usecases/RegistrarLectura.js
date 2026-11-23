const Lectura = require('../models/Lectura');
const Sensor = require('../models/Sensor');
const Alerta = require('../models/Alerta');
const { evaluarAlerta } = require('../models/ReglasAlerta');

class RegistrarLectura {
  constructor(sensorDao, alertaDao) {
    this.sensorDao = sensorDao;
    this.alertaDao = alertaDao;
  }

  ejecutar(datos) {
    const sensor = new Sensor(Lectura.crear(datos));
    const creado = !this.sensorDao.existe(sensor.id);
    const mensaje = evaluarAlerta(sensor);
    const alerta = mensaje === null ? null : new Alerta(sensor, mensaje);

    this.sensorDao.guardar(sensor);
    this.alertaDao.establecer(sensor.id, alerta);

    return { creado, lectura: { ...sensor.toJSON(), alerta: mensaje } };
  }
}

module.exports = RegistrarLectura;
