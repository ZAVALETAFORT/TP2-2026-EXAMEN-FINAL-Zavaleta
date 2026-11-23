class Sensor {
  constructor(lectura) {
    this.id = lectura.id;
    this.tipo = lectura.tipo;
    this.valor = lectura.valor;
    this.timestamp = lectura.timestamp;
  }

  toJSON() {
    return {
      id: this.id,
      tipo: this.tipo,
      valor: this.valor,
      timestamp: this.timestamp
    };
  }
}

module.exports = Sensor;
