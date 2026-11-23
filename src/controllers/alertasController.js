function crearAlertasController(listarAlertas) {
  return {
    listar(req, res, next) {
      try {
        res.status(200).json(listarAlertas.ejecutar());
      } catch (error) {
        next(error);
      }
    }
  };
}

module.exports = crearAlertasController;
