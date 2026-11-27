import create from "./create.js";
import getAll from "./getAll.js";
import getById from "./getById.js";
import update from "./update.js";
import remove from "./remove.js";

export default function makeUseCases(dao) {
  return {
    create: data => create(data, dao),
    getAll: () => getAll(dao),
    getById: id => getById(id, dao),
    update: (id, data) => update(id, data, dao),
    remove: id => remove(id, dao)
  };
}
