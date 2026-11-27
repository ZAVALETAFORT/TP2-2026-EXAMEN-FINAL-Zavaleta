import AppError from "../errors/AppError.js";

export default function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ errorMsg: err.message });
  }
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ errorMsg: "JSON inválido" });
  }
  console.error(err);
  res.status(500).json({ errorMsg: "Error interno del servidor" });
}
