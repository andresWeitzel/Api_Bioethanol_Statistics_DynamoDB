//Enums
const { statusCode } = require('../../../enums/http/status-code');
//Helpers
const { bodyResponse } = require('../../http/body-response');
const { validateAuthHeaders } = require('../validator/auth/headers');
const {
  validateHeadersParams,
} = require('../validator/http/request-headers-params');
//Const-vars
let checkEventHeaders;
let validateReqParams;
let validateAuth;
let msgResponse;
let msgLog;

/**
   * @description Validates that all the necessary headers are correct, along with the x-api-key and the bearer token
   * @param {Object} inputEventHeaders event.headers type
   * @returns a json object with status code and msj
   * @example  return await requestResult(
        statusCode.UNAUTHORIZED,
        "Not authenticated, check x_api_key and Authorization"
      );
   */
const validateHeadersAndKeys = async (inputEventHeaders) => {
  try {
    checkEventHeaders = null;
    msgResponse = null;
    msgLog = null;

    //-- start with validation Headers  ---
    validateReqParams = await validateHeadersParams(await inputEventHeaders);

    if (!validateReqParams) {
      checkEventHeaders = await bodyResponse(
        statusCode.BAD_REQUEST,
        'Bad request, check missing or malformed headers',
      );
    }

    validateAuth = await validateAuthHeaders(await inputEventHeaders);

    if (!validateAuth) {
      checkEventHeaders = await bodyResponse(
        statusCode.UNAUTHORIZED,
        'Not authenticated, check x_api_key and Authorization',
      );
    }
    //-- end with validation Headers  ---

    return checkEventHeaders;
  } catch (error) {
    msgResponse = 'ERROR in validateHeadersAndKeys() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return msgResponse;
  }
};

module.exports = {
  validateHeadersAndKeys,
};
