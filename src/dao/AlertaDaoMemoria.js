class AlertaDaoMemoria {
  constructor() {
    this.alertas = new Map();
  }

  establecer(sensorId, alerta) {
    if (alerta === null) {
      this.alertas.delete(sensorId);
      return;
    }
    this.alertas.set(sensorId, alerta);
  }

  listar() {
    return Array.from(this.alertas.values());
  }
}

module.exports = AlertaDaoMemoria;
