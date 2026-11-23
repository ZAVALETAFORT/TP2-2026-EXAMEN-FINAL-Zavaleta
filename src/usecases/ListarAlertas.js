class ListarAlertas {
  constructor(alertaDao) {
    this.alertaDao = alertaDao;
  }

  ejecutar() {
    return this.alertaDao.listar().map((alerta) => alerta.toJSON());
  }
}

module.exports = ListarAlertas;
