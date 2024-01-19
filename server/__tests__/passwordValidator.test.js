const { validatePassword } = require("../passwordValidator");

// TODO: move to helper file
function checkForUnmetValidation(validations, validationCode) {
  validations.forEach((validation) => {
    if (validation.code === validationCode) {
      expect(validation.isMet).toBe(false);
    } else {
      expect(validation.isMet).toBe(true);
    }
  });
}

describe("validatePassword", () => {
  it("should validate a valid password", () => {
    const { valid, validations } = validatePassword("Password123!");
    expect(valid).toBe(true);
    validations.forEach((validation) => {
      expect(validation.isMet).toBe(true);
    });
  });

  it("should not validate a password missing an uppercase letter", () => {
    const { valid, validations } = validatePassword("password123!");
    expect(valid).toBe(false);
    checkForUnmetValidation(validations, "hasUpperCaseValidation");
  });

  it("should not validate a password missing a lowercase letter", () => {
    const { valid, validations } = validatePassword("PASSWORD123!");
    expect(valid).toBe(false);
    expect(validations).toEqual(expect.any(Array));
    checkForUnmetValidation(validations, "hasLowerCaseValidation");
  });

  it("should not validate a password missing a number", () => {
    const { valid, validations } = validatePassword("Password!");
    expect(valid).toBe(false);
    expect(validations).toEqual(expect.any(Array));
    checkForUnmetValidation(validations, "hasNumberValidation");
  });

  it("should not validate a password missing a special character", () => {
    const { valid, validations } = validatePassword("Password123");
    expect(valid).toBe(false);
    expect(validations).toEqual(expect.any(Array));
    checkForUnmetValidation(validations, "hasSpecialCharacterValidation");
  });

  it("should not validate a password with less than 8 characters", () => {
    const { valid, validations } = validatePassword("P@ssw0r");
    expect(valid).toBe(false);
    expect(validations).toEqual(expect.any(Array));
    checkForUnmetValidation(validations, "hasMinimumLengthValidation");
  });
});
