const puerto = Number(process.env.PORT || 3000);

if (!Number.isInteger(puerto) || puerto < 1 || puerto > 65535) {
  throw new Error('PORT debe ser un numero de puerto valido');
}

module.exports = { puerto };
