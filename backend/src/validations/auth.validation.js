export const registerValidation = (body = {}) => {
  const { name, email, password } = body;

  if (!name || !email || !password) {
    throw {
      status: 400,
      message: "Name, email, and password are required"
    };
  }

  if (password.length < 6) {
    throw {
      status: 400,
      message: "Password must be at least 6 characters"
    };
  }
};
