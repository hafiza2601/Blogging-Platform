import bcrypt from "bcrypt";
import Auth from "../../shared/middlewares/auth.middleware.js";
import User from "./../../user_module/models/user.models.js"
import errors from "../../shared/utils/apiErrors.js";

const register = async (username, email, password) => {
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  await user.save();
  return user;
}

const login = async (user, password) => {
  // Validate the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw errors.InvalidCredentials();
  }

  // Generate JWT token
  const accessToken = await Auth.token(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    { expiresIn: process.env.JWT_EXPIRE }
  );

  return accessToken;
}

export default { register, login };