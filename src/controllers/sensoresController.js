function crearSensoresController(listarSensores) {
  return {
    listar(req, res, next) {
      try {
        res.status(200).json(listarSensores.ejecutar());
      } catch (error) {
        next(error);
      }
    }
  };
}

module.exports = crearSensoresController;
