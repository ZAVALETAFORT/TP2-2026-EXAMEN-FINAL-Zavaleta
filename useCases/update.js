import Item from "../models/Item.js";

export default async function update(id, data, dao) {
  return dao.update(id, new Item(data));
}
