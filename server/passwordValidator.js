const passwordValidator = (regex) => (pw) => regex.test(pw);
const hasLowerCase = passwordValidator(/[a-z]/);
const hasUpperCase = passwordValidator(/[A-Z]/);
const hasNumber = passwordValidator(/\d/);
const hasSpecialCharacter = passwordValidator(/[^a-zA-Z0-9]/);
const hasMinimumLength = passwordValidator(/^.{8,}$/);

function validatePassword(password) {
  const validations = [
    {
      code: "hasLowerCaseValidation",
      isMet: hasLowerCase(password),
      message: "Password must include at least one lowercase character.",
    },
    {
      code: "hasUpperCaseValidation",
      isMet: hasUpperCase(password),
      message: "Password must include at least one uppercase character.",
    },
    {
      code: "hasNumberValidation",
      isMet: hasNumber(password),
      message: "Password must include at least one number.",
    },
    {
      code: "hasSpecialCharacterValidation",
      isMet: hasSpecialCharacter(password),
      message: "Password must include at least one special character.",
    },
    {
      code: "hasMinimumLengthValidation",
      isMet: hasMinimumLength(password),
      message: "Password must be at least 8 characters long.",
    },
  ];
  const valid = validations.every((validation) => validation.isMet);
  return { valid, validations };
}

module.exports = { validatePassword };
