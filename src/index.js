const crearApp = require('./app');
const { puerto } = require('./config');

crearApp().listen(puerto, () => {
  console.log(`Servidor disponible en http://localhost:${puerto}`);
});
