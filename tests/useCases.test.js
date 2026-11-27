import test from "node:test";
import assert from "node:assert/strict";
import MemoryDao from "../dao/MemoryDao.js";
import makeUseCases from "../useCases/makeUseCases.js";

test("CRUD con DAO inyectado", async () => {
  const uc = makeUseCases(new MemoryDao());
  assert.deepEqual(await uc.getAll(), []);
  const item = await uc.create({ name: "A" });
  assert.deepEqual(item, { id: 1, name: "A" });
  item.name = "No persistir";
  assert.deepEqual(await uc.getById(1), { id: 1, name: "A" });
  assert.deepEqual(await uc.update(1, { name: "B" }), { id: 1, name: "B" });
  assert.equal(await uc.remove(1), true);
  assert.equal(await uc.getById(1), null);
  assert.equal(await uc.update(1, { name: "C" }), null);
  assert.equal(await uc.remove(1), false);
  assert.equal((await uc.create({ name: "D" })).id, 2);
});
