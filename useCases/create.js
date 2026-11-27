import Item from "../models/Item.js";

export default async function create(data, dao) {
  return dao.save(new Item(data));
}
