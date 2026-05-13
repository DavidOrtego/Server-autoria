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
        code: 201,
        title: "Created",
        success: true,
        message: "User registered successfully",
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
        code: 200,
        title: "Success",
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }



  /**
   * Obtiene los datos del usuario autenticado.
   * @param {Object} req - Request object.
   * @param {Object} res - Response object.
   * @param {Function} next - Next function.
   * @returns {Promise<void>}
   */
  async me(req, res, next) {
    try {
      res.status(200).json({
        code: 200,
        title: "Success",
        success: true,
        data: {
          id: req.user.id,
          email: req.user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}


module.exports = new AuthController();
