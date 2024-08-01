import { body, param } from 'express-validator';

// Define validation rules for registration
export const createCommentValidator = [
  param('id').isMongoId(),
  body('content')
    .isString()
    .withMessage('content must be a string')
    .notEmpty()
    .withMessage('content is required'),
];

export const updateCommentValidator = [
  param('id').isMongoId(),
  param('commentId').isMongoId(),
  body('content')
    .isString()
    .withMessage('content must be a string')
    .notEmpty()
    .withMessage('content is required'),
];

export const idValidator = [
  param('id').isMongoId(),
];

export const commentDeleteValidator = [
  param('id').isMongoId(),
  param('commentId').isMongoId(),
];
