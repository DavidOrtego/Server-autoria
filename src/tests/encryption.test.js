const {
  validatePasswordStrength,
  hashPassword,
  comparePassword,
} = require("../utils/encryption");

describe("Utilidad de Encriptación", () => {
  describe("validatePasswordStrength (Fortaleza de Contraseña)", () => {
    test("debería validar correctamente una contraseña fuerte", () => {
      const result = validatePasswordStrength("StrongP@ss123");
      expect(result.isValid).toBe(true);
      expect(result.message).toBe("Valid password");
    });

    test("debería rechazar contraseñas que son demasiado cortas", () => {
      const result = validatePasswordStrength("Sh0rt!");
      expect(result.isValid).toBe(false);
      expect(result.message).toContain("at least 8 characters long");
    });

    test("debería rechazar contraseñas sin letras mayúsculas", () => {
      const result = validatePasswordStrength("weakpass123!");
      expect(result.isValid).toBe(false);
      expect(result.message).toContain("at least one uppercase letter");
    });

    test("debería rechazar contraseñas sin letras minúsculas", () => {
      const result = validatePasswordStrength("WEAKPASS123!");
      expect(result.isValid).toBe(false);
      expect(result.message).toContain("at least one lowercase letter");
    });

    test("debería rechazar contraseñas sin números", () => {
      const result = validatePasswordStrength("WeakPassword!");
      expect(result.isValid).toBe(false);
      expect(result.message).toContain("at least one number");
    });

    test("debería rechazar contraseñas sin caracteres especiales", () => {
      const result = validatePasswordStrength("WeakPassword123");
      expect(result.isValid).toBe(false);
      expect(result.message).toContain("at least one special character");
    });
  });

  describe("hashPassword y comparePassword", () => {
    test("debería hashear una contraseña y verificar que coincida con la original", async () => {
      const plainPassword = "SecretPassword123!";
      const hashedPassword = await hashPassword(plainPassword);
      
      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(plainPassword);

      const isMatch = await comparePassword(plainPassword, hashedPassword);
      expect(isMatch).toBe(true);

      const isNotMatch = await comparePassword("WrongPassword!", hashedPassword);
      expect(isNotMatch).toBe(false);
    });
  });
});
