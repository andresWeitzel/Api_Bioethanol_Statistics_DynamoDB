/**
 * @description We define the status code according to its technical definition
 * @returns the status code
 * @example OK --> 200
 */
const statusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};

module.exports = { statusCode };
