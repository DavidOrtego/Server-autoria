const authService = require("../services/authService");


class AuthController {
  /**
   * Registra un nuevo usuario.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @param {Function} next - Next function.
   * @returns {Promise<void>}
   */
  async registerUser(req, res, next) {
    try {
      const result = await authService.registerUser(req.body);


      res.status(201).json({
        success: true,
        message: "Usuario registrado correctamente",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  
};