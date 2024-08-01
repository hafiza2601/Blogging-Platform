import express from "express";
import { register, login } from "./controllers/auth.controller.js";
import { registerUser, loginUser } from "./validators/auth.validator.js";
import { validate } from "../shared/middlewares/validator.middleware.js";

export const addRoutes = (app) => {
  const router = express.Router({
    mergeParams: true
  });

  // Define routes
  router.post('/register', validate(registerUser), register);
  router.post('/login', validate(loginUser), login);


  // Use the router in the app
  app.use('/api/auth', router);
};