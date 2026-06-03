require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path");

// Importar nuestras rutas
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const houseRoutes = require("./routes/houseRoutes");
const houseMemberRoutes = require("./routes/houseMemberRoutes");
const taskRoutes = require("./routes/taskRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

// Importar los manejadores de errores globales
const { errorHandler, notFound } = require("./middlewares/errorHandler");

const app = express();

// Middlewares base
const corsOrigin = process.env.CORS_ORIGIN || process.env.cors_origin || "http://localhost:5173";
app.use(cors({
  origin: corsOrigin.includes(",") ? corsOrigin.split(",").map(o => o.trim()) : corsOrigin,
  credentials: true, 
}));
app.use(express.json());

// Leer y parsear el archivo openapi.yaml
const swaggerDocument = yaml.load(fs.readFileSync(path.join(__dirname, '../docs/api/openapi.yaml'), 'utf8'));

// -----------------------------------------
// DOCUMENTACIÓN (Swagger)
// -----------------------------------------
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// -----------------------------------------
// RUTAS PRINCIPALES
// -----------------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/houses", houseRoutes);
app.use("/api/house-members", houseMemberRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/reviews", reviewRoutes);

// MANEJO DE ERRORES

// 1. Si la petición no coincide con ninguna ruta de arriba, es un 404
app.use(notFound);

// 2. Si ocurre cualquier error en tu código (los next(error)), caerá aquí
app.use(errorHandler);

module.exports = app;
