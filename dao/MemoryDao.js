export default class MemoryDao {
  #data = [];
  #nextId = 1;

  async getAll() {
    return this.#data.map(item => ({ ...item }));
  }

  async getById(id) {
    const item = this.#data.find(item => item.id === Number(id));
    return item ? { ...item } : null;
  }

  async save(data) {
    const item = { ...data, id: this.#nextId++ };
    this.#data.push(item);
    return { ...item };
  }

  async update(id, data) {
    const index = this.#data.findIndex(item => item.id === Number(id));
    if (index === -1) return null;
    const item = { ...this.#data[index], ...data, id: this.#data[index].id };
    this.#data[index] = item;
    return { ...item };
  }

  async delete(id) {
    const index = this.#data.findIndex(item => item.id === Number(id));
    if (index === -1) return false;
    this.#data.splice(index, 1);
    return true;
  }
}
