# API REST

Base de Node.js y Express con persistencia en memoria.

## Ejecución

Requiere Node.js 22.9 o superior.

```bash
npm ci
npm run dev
npm test
```

Puerto por defecto: 8080. Para cambiarlo, copiar `.env.example` a `.env`.

## Estructura

- `index.js`: arranque del servidor.
- `app.js`: configuración de Express.
- `container/`: inyección de dependencias.
- `routes/`, `controllers/`: entrada HTTP.
- `useCases/`: operaciones y reglas de negocio.
- `models/`, `schemas/`: datos y validaciones.
- `dao/`: persistencia.
- `middlewares/`, `errors/`: validación y errores.

Flujo: ruta → controlador → caso de uso → DAO.

## CRUD de referencia

`Item` y `/items` son nombres provisionales. El campo `name` es un ejemplo.

| Método | Ruta | Resultado |
| --- | --- | --- |
| GET | /items | 200 |
| GET | /items/:id | 200 |
| POST | /items | 201 |
| PUT | /items/:id | 200 |
| DELETE | /items/:id | 204 |

Los errores se devuelven como `{ "errorMsg": "..." }` (400, 404 o 500).

Al recibir la consigna, renombrar el recurso, adaptar el modelo, los schemas y los casos de uso, ajustar las rutas y quitar las operaciones no solicitadas. Actualizar las pruebas y este README.

`requests.http` contiene ejemplos de solicitudes. Los datos se pierden al reiniciar el servidor.
