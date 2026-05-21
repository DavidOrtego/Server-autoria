const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation errors",
      errors: errors.array().map((error) => ({
        field: error.path || error.param,
        message: error.msg,
        value: error.value,
      })),
    });
  }

  next();
};

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Error de validación de base de datos
  if (err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({
      success: false,
      message: "The resource already exists",
      error: err.sqlMessage,
    });
  }

  // Error de base de datos
  if (err.code && err.code.startsWith("ER_")) {
    return res.status(500).json({
      success: false,
      message: "Database error",
      error:
        process.env.NODE_ENV === "development" ? err.sqlMessage : undefined,
    });
  }

  // Error personalizado con status
  if (err.status) {
    return res.status(err.status).json({
      success: false,
      message: err.message || "Request error",
    });
  }

  // Error por defecto
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};


const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
};

module.exports = {
  handleValidationErrors,
  errorHandler,
  notFound,
};