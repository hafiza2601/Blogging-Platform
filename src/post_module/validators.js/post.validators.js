import { body, param, oneOf } from 'express-validator';

// Define validation rules for registration
export const createPostValidator = [
  body('title')
    .isString()
    .withMessage('title must be a string')
    .notEmpty()
    .withMessage('title is required'),

  body('content')
    .isString()
    .withMessage('content must be a string')
    .notEmpty()
    .withMessage('content is required'),
];

export const updatePostValidator = [
  param('id').isMongoId(),
  oneOf([
    body('title')
      .isString().withMessage('Title must be a string')
      .notEmpty().withMessage('Title cannot be empty'),
    body('content')
      .isString().withMessage('Content must be a string')
      .notEmpty().withMessage('Content cannot be empty'),
  ], 'At least one of "title" or "content" must be provided'),
];

export const idValidator = [
  param('id').isMongoId(),
];
