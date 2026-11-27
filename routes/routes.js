import { Router } from "express";
import validate from "../middlewares/validate.js";
import { idSchema, itemSchema } from "../schemas/itemSchema.js";

export default function createRoutes(controller) {
  const router = Router();
  router.get("/", controller.list);
  router.get("/:id", validate(idSchema, "params"), controller.get);
  router.post("/", validate(itemSchema), controller.create);
  router.put("/:id", validate(idSchema, "params"), validate(itemSchema), controller.update);
  router.delete("/:id", validate(idSchema, "params"), controller.remove);
  return router;
}
