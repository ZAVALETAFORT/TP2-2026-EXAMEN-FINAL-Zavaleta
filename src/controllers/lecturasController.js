function crearLecturasController(registrarLectura) {
  return {
    registrar(req, res, next) {
      try {
        const resultado = registrarLectura.ejecutar(req.body);
        res.status(resultado.creado ? 201 : 200).json(resultado.lectura);
      } catch (error) {
        next(error);
      }
    }
  };
}

module.exports = crearLecturasController;
