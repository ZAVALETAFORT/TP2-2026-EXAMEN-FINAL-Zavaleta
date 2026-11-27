import AppError from "../errors/AppError.js";

export default class Controller {
  constructor(useCases) {
    this.useCases = useCases;
  }

  create = async (req, res) => {
    res.status(201).json(await this.useCases.create(req.body));
  };

  list = async (req, res) => {
    res.json(await this.useCases.getAll());
  };

  get = async (req, res) => {
    const item = await this.useCases.getById(req.params.id);
    if (!item) throw new AppError("Recurso inexistente", 404);
    res.json(item);
  };

  update = async (req, res) => {
    const item = await this.useCases.update(req.params.id, req.body);
    if (!item) throw new AppError("Recurso inexistente", 404);
    res.json(item);
  };

  remove = async (req, res) => {
    const deleted = await this.useCases.remove(req.params.id);
    if (!deleted) throw new AppError("Recurso inexistente", 404);
    res.status(204).end();
  };
}
