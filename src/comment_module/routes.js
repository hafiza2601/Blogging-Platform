import express from "express";
import { addOne, updateComment, getComment, deleteComment } from "./controller/comment.controller.js";
import { createCommentValidator, updateCommentValidator, idValidator, commentDeleteValidator } from "./validators/comment.validator.js";
import { validate } from "../shared/middlewares/validator.middleware.js";
import auth from "../shared/middlewares/auth.middleware.js";
import { checkOwnership } from "../shared/middlewares/checkOwnership.middleware.js";

export const addRoutes = (app) => {
  const router = express.Router({
    mergeParams: true
  });

  // Define routes
  router.post(
    '/comment',
    auth.authenticate,
    validate(createCommentValidator),
    addOne
  );

  router.put(
    '/comment/:commentId',
    auth.authenticate,
    checkOwnership("comment"),
    validate(updateCommentValidator),
    updateComment
  );

  router.get(
    '/comment',
    validate(idValidator),
    getComment
  );

  router.delete(
    '/comment/:commentId',
    auth.authenticate,
    checkOwnership("comment"),
    validate(commentDeleteValidator),
    deleteComment
  );

  // Use the router in the app
  app.use('/api/post/:id', router);
};