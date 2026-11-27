import test from "node:test";
import assert from "node:assert/strict";
import createApp from "../app.js";

test("CRUD y validaciones", async t => {
  const server = createApp().listen(0, "127.0.0.1");
  await new Promise(resolve => server.once("listening", resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;
  const request = (path, method = "GET", data) => fetch(base + path, {
    method,
    ...(data === undefined ? {} : {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
  });

  let res = await request("/items");
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), []);

  res = await request("/items", "POST", { name: " Ejemplo " });
  assert.equal(res.status, 201);
  assert.deepEqual(await res.json(), { id: 1, name: "Ejemplo" });

  res = await request("/items/1");
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { id: 1, name: "Ejemplo" });

  res = await request("/items/1", "PUT", { name: "Actualizado" });
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { id: 1, name: "Actualizado" });

  res = await request("/items/1", "DELETE");
  assert.equal(res.status, 204);
  assert.equal((await request("/items/1")).status, 404);
  assert.equal((await request("/items/1", "PUT", { name: "X" })).status, 404);
  assert.equal((await request("/items/1", "DELETE")).status, 404);

  res = await request("/items", "POST", { name: "" });
  assert.equal(res.status, 400);
  assert.equal(typeof (await res.json()).errorMsg, "string");
  assert.equal((await request("/items/abc")).status, 400);
  assert.equal((await request("/items", "POST", { name: "X", id: 9 })).status, 400);
  assert.equal((await request("/no-existe")).status, 404);

  res = await fetch(base + "/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{"
  });
  assert.equal(res.status, 400);
  assert.equal(typeof (await res.json()).errorMsg, "string");
  assert.deepEqual(await (await request("/items")).json(), []);
});
