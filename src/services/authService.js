const { db } = require('../config/database');
const { hashPassword, comparePassword } = require('../utils/encryption');
const { generateTokens, verifyRefreshToken } = require('../utils/jwt');


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
  };