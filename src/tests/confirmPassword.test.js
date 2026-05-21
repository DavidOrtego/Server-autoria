const { confirmPassword } = require("../utils/confirmPassword");

describe("Utilidad confirmPassword", () => {
  test("debería devolver true si las contraseñas coinciden", () => {
    const result = confirmPassword("Password123!", "Password123!");
    expect(result).toBe(true);
  });

  test("debería lanzar un error si las contraseñas no coinciden", () => {
    expect(() => {
      confirmPassword("Password123!", "DifferentPassword123!");
    }).toThrow("The passwords do not match");
  });
});
