class SensorDaoMemoria {
  constructor() {
    this.sensores = new Map();
  }

  existe(id) {
    return this.sensores.has(id);
  }

  guardar(sensor) {
    this.sensores.set(sensor.id, sensor);
  }

  listar() {
    return Array.from(this.sensores.values());
  }
}

module.exports = SensorDaoMemoria;
