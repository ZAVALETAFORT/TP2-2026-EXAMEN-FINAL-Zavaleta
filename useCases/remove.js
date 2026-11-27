export default async function remove(id, dao) {
  return dao.delete(id);
}
