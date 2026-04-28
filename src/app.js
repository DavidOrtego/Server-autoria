const express = require("express");
const cors = require("cors");
// const usuariosRoutes = require('./routes/usuarios'); cuando se añada routes/usurios quitar comentarios

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
// app.use('/api/usuarios', usuariosRoutes);

app.get("/api/ping", (req, res) => {
  res.json({ mensaje: "¡Pong! El servidor de Vives está vivo." });
});

module.exports = app;
