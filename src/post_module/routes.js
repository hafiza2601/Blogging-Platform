import express from "express";
import postCtrl from "./controllers/post.controller.js";
import { createPostValidator, idValidator, updatePostValidator } from "./validators.js/post.validators.js";
import { validate } from "../shared/middlewares/validator.middleware.js";
import auth from "../shared/middlewares/auth.middleware.js";
import { checkOwnership } from "../shared/middlewares/checkOwnership.middleware.js";

export const addRoutes = (app) => {
  const router = express.Router({
    mergeParams: true
  });

  // Define routes
  router.post(
    '/',
    auth.authenticate,
    validate(createPostValidator),
    postCtrl.createPost
  );

  router.get(
    '/',
    postCtrl.listPosts
  );

  router.put(
    '/:id',
    auth.authenticate,
    checkOwnership("post"),
    validate(updatePostValidator),
    postCtrl.updatePost
  );

  router.delete(
    '/:id',
    auth.authenticate,
    checkOwnership("post"),
    validate(idValidator),
    postCtrl.deletePost
  );

  router.get(
    '/:id',
    validate(idValidator),
    postCtrl.getPost
  );


  // Use the router in the app
  app.use('/api/post', router);
};