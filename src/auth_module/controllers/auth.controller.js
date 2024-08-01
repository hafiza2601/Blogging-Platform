import authPolicies from "../policies/auth.policies.js";
import authServices from "../services/auth.services.js";
import ErrorHandler from "../../shared/middlewares/errorHandler.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    await authPolicies.register(email);

    const user = await authServices.register(username, email, password);

    res.status(201).json({
      user,
      message: "Account successfully created",
    });
  } catch (error) {
    ErrorHandler(error, req, res, next);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await authPolicies.login(username);

    const accessToken = await authServices.login(user, password);

    // Send the JWT accessToken with success message in the response
    res.json({
      accessToken: accessToken,
      message: "Login is successful",
      success: true,
    });
  } catch (error) {
    ErrorHandler(error, req, res);
  }
};