// src/server.js
require('dotenv').config();
const app = require('./app');
const { db } = require('./config/database');
const { config } = require('./config/config');

const PORT = config.service.port || 3000;

const startServer = async () => {
  try {
    await db.raw('SELECT 1+1 AS result');
    console.log('✅ Database connection established correctly with Knex.');

    app.listen(PORT, () => {
      console.log(`🚀 Vives Server running on http://localhost:${PORT}`);
      console.log(`📖 Documentation available in the openapi.yaml file`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to the database:', error.message);
    process.exit(1);
  }
};

startServer();