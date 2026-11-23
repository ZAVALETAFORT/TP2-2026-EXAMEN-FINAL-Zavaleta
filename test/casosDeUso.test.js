const { test } = require('node:test');
const assert = require('node:assert/strict');
const crearDaos = require('../src/factories/daoFactory');
const crearCasosDeUso = require('../src/factories/useCaseFactory');

function escenario() {
  return crearCasosDeUso(crearDaos());
}

function dato(tipo = 'TEMPERATURA', valor = 40, id = 'SEN4A9X1') {
  return { id, tipo, valor, timestamp: '2026-11-23T18:30:00Z' };
}

test('registra un sensor nuevo y devuelve una alerta', () => {
  const casos = escenario();
  const resultado = casos.registrarLectura.ejecutar(dato());
  assert.equal(resultado.creado, true);
  assert.equal(resultado.lectura.alerta, 'TEMPERATURA alta');
  assert.equal(casos.listarSensores.ejecutar().length, 1);
  assert.equal(casos.listarAlertas.ejecutar().length, 1);
});

test('actualiza la ultima lectura sin duplicar sensores', () => {
  const casos = escenario();
  casos.registrarLectura.ejecutar(dato());
  const resultado = casos.registrarLectura.ejecutar(dato('TEMPERATURA', 32));
  assert.equal(resultado.creado, false);
  assert.equal(resultado.lectura.alerta, null);
  assert.equal(casos.listarSensores.ejecutar().length, 1);
  assert.equal(casos.listarSensores.ejecutar()[0].valor, 32);
  assert.deepEqual(casos.listarAlertas.ejecutar(), []);
});

test('respeta los valores limite de cada umbral', () => {
  const casos = escenario();
  const valores = [
    ['TEMPERATURA', 35, null], ['TEMPERATURA', 35.1, 'TEMPERATURA alta'],
    ['HUMEDAD', 20, null], ['HUMEDAD', 19.9, 'HUMEDAD baja'],
    ['CO2', 1000, null], ['CO2', 1001, 'CO2 alto']
  ];
  for (const [tipo, valor, esperado] of valores) {
    const resultado = casos.registrarLectura.ejecutar(dato(tipo, valor));
    assert.equal(resultado.lectura.alerta, esperado);
  }
});

test('mantiene solo la alerta mas reciente por sensor', () => {
  const casos = escenario();
  casos.registrarLectura.ejecutar(dato());
  casos.registrarLectura.ejecutar(dato('HUMEDAD', 15));
  const alertas = casos.listarAlertas.ejecutar();
  assert.equal(alertas.length, 1);
  assert.equal(alertas[0].tipo, 'HUMEDAD');
});

test('rechaza lecturas invalidas sin modificar datos', () => {
  const casos = escenario();
  for (const entrada of [
    null, {}, dato('OTRO', 3), dato('CO2', '3'), dato('CO2', NaN),
    { ...dato(), id: 'ABC' }, { ...dato(), timestamp: '' }
  ]) {
    assert.throws(() => casos.registrarLectura.ejecutar(entrada));
  }
  assert.deepEqual(casos.listarSensores.ejecutar(), []);
});
