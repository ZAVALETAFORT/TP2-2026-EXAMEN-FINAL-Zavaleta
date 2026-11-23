const reglas = {
  TEMPERATURA: { activa: (valor) => valor > 35, mensaje: 'TEMPERATURA alta' },
  HUMEDAD: { activa: (valor) => valor < 20, mensaje: 'HUMEDAD baja' },
  CO2: { activa: (valor) => valor > 1000, mensaje: 'CO2 alto' }
};

function evaluarAlerta(sensor) {
  const regla = reglas[sensor.tipo];
  return regla.activa(sensor.valor) ? regla.mensaje : null;
}

module.exports = { evaluarAlerta };
