/**
 * Compara dos contraseñas y devuelve un booleano
 * @param {string} value - Contraseña a comparar
 * @param {string} newPassword - Nueva contraseña
 * @returns {boolean} - Devuelve true si las contraseñas son iguales
 */
function confirmPassword(value, newPassword) {
  if (value !== newPassword) {
    throw new Error("The passwords do not match");
  }
  return true;
}

module.exports = { confirmPassword };