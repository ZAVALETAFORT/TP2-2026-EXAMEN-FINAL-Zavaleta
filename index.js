import createApp from "./app.js";
import { PORT } from "./config/config.js";

createApp().listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
