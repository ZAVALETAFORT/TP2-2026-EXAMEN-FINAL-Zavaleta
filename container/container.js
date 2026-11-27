import MemoryDao from "../dao/MemoryDao.js";
import makeUseCases from "../useCases/makeUseCases.js";
import Controller from "../controllers/Controller.js";
import createRoutes from "../routes/routes.js";

export default function buildContainer() {
  const dao = new MemoryDao();
  const useCases = makeUseCases(dao);
  const controller = new Controller(useCases);
  return createRoutes(controller);
}
