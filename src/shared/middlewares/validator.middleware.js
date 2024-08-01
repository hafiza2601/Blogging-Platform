import { validationResult } from 'express-validator';

export function validate(validationChains) {
  return async (req, res, next) => {
    for (const validation of validationChains) {
      await validation.run(req);
    }

    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }

    const errors = Object.entries(result.mapped()).map(([_, value]) => value);
    const error = errors.map(err => ({...err}));
    return res.status(422).json(error);
  };
}