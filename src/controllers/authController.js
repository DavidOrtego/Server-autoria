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
  
  /**
   * Inicia sesión en un usuario existente.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @param {Function} next - Next function.
   * @returns {Promise<void>}
   */
  async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.loginUser(email, password);


      res.status(200).json({
        success: true,
        message: "Login exitoso",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
 /**
   * Cambia la contraseña de un usuario.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @param {Function} next - Next function.
   * @returns {Promise<void>}
   */
  async changePassword(req, res, next) {
    try {
      const userId = req.user.id;
      const { oldPassword, newPassword } = req.body;
      const result = await authService.changePassword(
        userId,
        oldPassword,
        newPassword,
      );


      res.status(200).json({
        success: true,
        message: "Contraseña cambiada correctamente",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

};