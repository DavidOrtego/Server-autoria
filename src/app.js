const express = require("express");
const cors = require("cors");

// Importar nuestras rutas
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const houseRoutes = require("./routes/houseRoutes");
const houseMemberRoutes = require("./routes/houseMemberRoutes");
const taskRoutes = require("./routes/taskRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

// Importar los manejadores de errores globales
const { errorHandler, notFound } = require("./middlewares/errorHandler");

const app = express();

// Middlewares base
app.use(cors());
app.use(express.json());

// -----------------------------------------
// RUTAS PRINCIPALES
// -----------------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/houses", houseRoutes);
app.use("/api/house-members", houseMemberRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/expenses", expenseRoutes);

// Ruta de prueba (Ping)
app.get("/api/ping", (req, res) => {
  res.json({ mensaje: "¡Pong! El servidor de Vives está vivo." });
});

// -----------------------------------------
// MANEJO DE ERRORES (Siempre va al final)
// -----------------------------------------

// 1. Si la petición no coincide con ninguna ruta de arriba, es un 404
app.use(notFound);

// 2. Si ocurre cualquier error en tu código (los next(error)), caerá aquí
app.use(errorHandler);

module.exports = app;
