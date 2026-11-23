# Examen final TP2 - Proyecto de practica

Backend REST con Node.js y Express para registrar lecturas de sensores, consultar la ultima lectura por sensor y listar las alertas activas. Este proyecto sirve como base de trabajo para practicar distintas consignas del examen final.

## Requisitos

Node.js 20 o superior y npm.

```bash
npm ci
npm start
```

Para desarrollo, `npm run dev`. Puerto predeterminado: `3000`; se puede modificar con `PORT`.

## Endpoints

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| POST | `/lecturas` | Registra una lectura; reemplaza la anterior del mismo sensor |
| GET | `/sensores` | Lista los sensores y su ultima lectura |
| GET | `/alertas` | Lista solamente las alertas activas |

Ejemplo de registro:

```bash
curl -i -X POST http://localhost:3000/lecturas \
  -H 'Content-Type: application/json' \
  -d '{"id":"SEN4A9X1","tipo":"TEMPERATURA","valor":40,"timestamp":"2026-11-23T18:30:00Z"}'
```

Al crear un sensor, responde `201`. Si el ID ya existe, devuelve `200` y actualiza su lectura. Los listados responden `200`. Una solicitud invalida devuelve `400` con `{ "errorMsg": "..." }`. Las rutas inexistentes devuelven `404`.

Los tipos aceptados son `TEMPERATURA`, `HUMEDAD` y `CO2`. El identificador debe tener exactamente ocho caracteres alfanumericos; `valor` debe ser un numero JSON valido y `timestamp` un string no vacio.

Las alertas se activan con temperatura mayor a 35, humedad menor a 20 o CO2 mayor a 1000. Cuando un sensor recibe una lectura que no supera el umbral, su alerta deja de aparecer en el listado.

Los datos se conservan en memoria RAM mientras el servidor esta encendido.

## Arquitectura

```text
src/
  index.js               Inicio del servidor
  app.js                 Configuracion Express y conexion de capas
  config/                Variables de configuracion
  routes/                Definicion de endpoints
  controllers/           Traduccion entre HTTP y casos de uso
  usecases/              Operaciones y coordinacion del negocio
  models/                Entidades, validaciones y reglas de alerta
  dao/                   Persistencia en memoria
  factories/             Construccion e inyeccion de dependencias
  middlewares/           Validacion de peticiones y errores HTTP
  errors/                Tipos de error propios
http/                    Peticiones HTTP de ejemplo
 test/                   Pruebas automatizadas
```

Los controladores reciben casos de uso. Los casos de uso reciben DAO mediante sus constructores. El modelo no depende de Express ni de infraestructura. Las factories construyen las dependencias al iniciar la aplicacion.

## Pruebas

```bash
npm test
```

Los tests de casos de uso verifican altas, actualizaciones, umbrales y validaciones. Los tests HTTP verifican rutas, respuestas y errores. Tambien se pueden ejecutar las solicitudes de `http/solicitudes.http` desde un cliente REST.

No se incluyen bases de datos, autenticacion ni interfaz web: no son necesarios en esta practica.
