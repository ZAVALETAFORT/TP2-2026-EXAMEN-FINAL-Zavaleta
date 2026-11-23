const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const crearApp = require('../src/app');

const servidor = crearApp().listen(0);
after(() => servidor.close());
const baseUrl = `http://127.0.0.1:${servidor.address().port}`;

async function consultar(ruta, metodo = 'GET', body) {
  const respuesta = await fetch(`${baseUrl}${ruta}`, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  return { status: respuesta.status, datos: await respuesta.json() };
}

test('la API registra, actualiza y lista alertas activas', async () => {
  const lectura = { id: 'SEN4A9X1', tipo: 'CO2', valor: 1001, timestamp: '2026-11-23T18:30:00Z' };
  let respuesta = await consultar('/lecturas', 'POST', lectura);
  assert.equal(respuesta.status, 201);
  assert.equal(respuesta.datos.alerta, 'CO2 alto');

  respuesta = await consultar('/alertas');
  assert.equal(respuesta.status, 200);
  assert.equal(respuesta.datos.length, 1);

  respuesta = await consultar('/lecturas', 'POST', { ...lectura, valor: 1000 });
  assert.equal(respuesta.status, 200);
  assert.equal(respuesta.datos.alerta, null);

  respuesta = await consultar('/sensores');
  assert.equal(respuesta.status, 200);
  assert.equal(respuesta.datos.length, 1);
  assert.equal(respuesta.datos[0].valor, 1000);

  respuesta = await consultar('/alertas');
  assert.equal(respuesta.datos.length, 0);
});

test('la API devuelve errores JSON con codigos HTTP adecuados', async () => {
  const invalido = await consultar('/lecturas', 'POST', { id: 'MAL' });
  assert.equal(invalido.status, 400);
  assert.ok(invalido.datos.errorMsg);

  const noEncontrada = await consultar('/desconocida');
  assert.equal(noEncontrada.status, 404);
  assert.ok(noEncontrada.datos.errorMsg);

  const respuesta = await fetch(`${baseUrl}/lecturas`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{'
  });
  assert.equal(respuesta.status, 400);
  assert.ok((await respuesta.json()).errorMsg);
});
