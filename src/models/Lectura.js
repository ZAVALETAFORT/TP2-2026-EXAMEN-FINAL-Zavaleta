const ErrorValidacion = require('../errors/ErrorValidacion');

const TIPOS = new Set(['TEMPERATURA', 'HUMEDAD', 'CO2']);
const CODIGO_SENSOR = /^[A-Za-z0-9]{8}$/;

class Lectura {
  constructor({ id, tipo, valor, timestamp }) {
    this.id = id;
    this.tipo = tipo;
    this.valor = valor;
    this.timestamp = timestamp;
  }

  static crear(datos) {
    if (typeof datos?.id !== 'string' || !CODIGO_SENSOR.test(datos.id)) {
      throw new ErrorValidacion('id debe contener 8 caracteres alfanumericos');
    }
    if (!TIPOS.has(datos.tipo)) {
      throw new ErrorValidacion('tipo debe ser TEMPERATURA, HUMEDAD o CO2');
    }
    if (typeof datos.valor !== 'number' || !Number.isFinite(datos.valor)) {
      throw new ErrorValidacion('valor debe ser un numero valido');
    }
    if (typeof datos.timestamp !== 'string' || datos.timestamp.trim() === '') {
      throw new ErrorValidacion('timestamp debe ser un string no vacio');
    }

    return new Lectura(datos);
  }
}

module.exports = Lectura;
