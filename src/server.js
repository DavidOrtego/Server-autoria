// src/server.js
const app = require('./app');
const { db } = require('./config/database');
const { config } = require('./config/config');

const PORT = config.service.port || 3000;

const startServer = async () => {
  try {
    // Intentamos una consulta simple para ver si Knex conecta con MariaDB
    await db.raw('SELECT 1+1 AS result');
    console.log('✅ Conexión a la base de datos establecida correctamente con Knex.');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor Vives corriendo en http://localhost:${PORT}`);
      console.log(`📖 Documentación disponible en el archivo openapi.yaml`);
    });
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error.message);
    process.exit(1);
  }
};

startServer();