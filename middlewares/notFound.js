import AppError from "../errors/AppError.js";

export default function notFound(req, res, next) {
  next(new AppError("Ruta inexistente", 404));
}
