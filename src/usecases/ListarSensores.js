class ListarSensores {
  constructor(sensorDao) {
    this.sensorDao = sensorDao;
  }

  ejecutar() {
    return this.sensorDao.listar().map((sensor) => sensor.toJSON());
  }
}

module.exports = ListarSensores;
