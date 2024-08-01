import createHttpError from "http-errors";

const MissingAuthorizationHeader = () => {
  return createHttpError(401, {
    statusCode: 'MISSING_AUTHORIZATION_HEADER',
    message: 'Missing authorization header'
  });
};

const MissingBearerAuthorizationHeader = () => {
  return createHttpError(401, {
    statusCode: 'MISSING_BEARER_AUTHORIZATION_HEADER',
    message: 'Missing bearer authorization header'
  });
};

const InvalidBearerToken = () => {
  return createHttpError(401, {
    statusCode: 'INVALID_BEARER_TOKEN',
    message: 'Invalid bearer token'
  });
};

const InvalidCredentials = () => {
  return createHttpError(401, {
    statusCode: 'INVALID_CREDENTIALS',
    message: 'Invalid credentials'
  });
};

const BadRequest = (msg, status) => {
  return createHttpError(status ||  400, {
    statusCode: 'BAD_REQUEST',
    message: msg || 'Bad request'
  });
};

const NotFound = (msg) => {
  console.log('Not Found: ', msg);
  return createHttpError(404, {
    statusCode: 'NOT_FOUND',
    message: msg || 'Not found'
  });
};

const Unauthorized = (msg) => {
  return createHttpError(403, {
    statusCode: 'UNAUTHORISED',
    message: msg || 'Unauthorized'
  });
};

const AlreadyExists = (msg) => {
  return createHttpError(400, {
    statusCode: 'ALREADY_EXISTS',
    message: msg || 'Resource already exists'
  });
};

const errors = {
  MissingAuthorizationHeader,
  MissingBearerAuthorizationHeader,
  InvalidBearerToken,
  BadRequest,
  NotFound,
  Unauthorized,
  AlreadyExists,
  InvalidCredentials
}
 export default errors;
