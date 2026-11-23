class Alerta {
  constructor(sensor, mensaje) {
    this.id = sensor.id;
    this.tipo = sensor.tipo;
    this.valor = sensor.valor;
    this.timestamp = sensor.timestamp;
    this.alerta = mensaje;
  }

  toJSON() {
    return {
      id: this.id,
      tipo: this.tipo,
      valor: this.valor,
      timestamp: this.timestamp,
      alerta: this.alerta
    };
  }
}

module.exports = Alerta;
