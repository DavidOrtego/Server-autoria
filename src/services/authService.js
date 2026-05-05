const { db } = require('../config/database');
const { hashPassword, comparePassword } = require('../utils/encryption');
const { generateTokens } = require('../utils/jwt');


class AuthService {


    /**
     * Registra un nuevo usuario en la base de datos
     * @param {Object} userData datos del usuario a registrar
     * @returns {Promise<Object>} Retorna el usuario creado y los tokens generados
     */
    async registerUser(userData) {
        const {
          name,
          email,
          password,
          rol = "member"
        } = userData;


        // verificar si ya existe el usuario
        const existingUser = await db("Users").where("email", email).first();
        if(existingUser){
            throw { status: 409, message: "El email ya está en uso." };
        }


        // Hashear contraseña
        const hashedPassword = await hashPassword(password);


        // crear nuevo usuario
        const [userId] = await db("Users").insert({
          name,
          email,
          password: hashedPassword,
          rol
        });


        // devolver el usuario y tokens
        const user = await db("Users").select(
            "id_user",
            "name",
            "email",
            "rol",
            "image"
        ).where({id_user: userId}).first();


        // generar tokens
        const tokens = generateTokens(user);


        return { user, tokens };
    }

    /**
     * Inicia sesión y genera tokens
     * @param {string} email - Correo electrónico del usuario
     * @param {string} password - Contraseña del usuario
     * @returns {Promise<Object>} Objeto con usuario y tokens
     */
    async loginUser(email, password){
        //comprobar si existe si existe el email
        const user = await db("Users").where({"email": email}).first();
        if(!user){
            throw { status: 404, message: "Usuario no encontrado"}
        }


        //comprobar la contraseña
        const isPasswordOk = await comparePassword(password, user.password);
        if(!isPasswordOk){
            throw { status: 401, message: "Contraseña incorrecta"}
        }


        // Eliminar contraseña del objeto usuario
        const { password: _, ...userWithoutPassword } = user;


        // Crear token para el usuario
        const tokens = generateTokens(user);


        // Devolver usuario y tokens
        return { user: userWithoutPassword, tokens };
    }


}
module.exports = new AuthService();