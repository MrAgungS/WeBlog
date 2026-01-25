import { AppError } from "../errors/AppError.js";

export const registerValidation = (body = {}) => {
  const { name, email, password } = body;
  if (!name || !email || !password) {
    throw new AppError("Name, email, and password are required", 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new AppError("Invalid email format", 400);
  }

  if (password.length < 6) {
    throw new AppError("Password must be at least 6 characters", 400);
  }
}
