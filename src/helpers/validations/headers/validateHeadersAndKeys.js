//Enums
const { statusCode } = require("../../../enums/http/statusCode");
//Helpers
const { bodyResponse } = require("../../http/bodyResponse");
const { validateAuthHeaders } = require("../validator/auth/headers");
const { validateHeadersParams } = require("../validator/http/requestHeadersParams");
//Const-vars
let checkEventHeaders;
let validateReqParams;
let validateAuth; 
  
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
    //-- start with validation Headers  ---
    checkEventHeaders = null;

    validateReqParams = await validateHeadersParams(await inputEventHeaders);

    if (!validateReqParams) {
        checkEventHeaders = await bodyResponse(
        statusCode.BAD_REQUEST,
        "Bad request, check missing or malformed headers"
      );
    }

    validateAuth = await validateAuthHeaders(await inputEventHeaders);

    if (!validateAuth) {
        checkEventHeaders = await bodyResponse(
        statusCode.UNAUTHORIZED,
        "Not authenticated, check x_api_key and Authorization"
      );
    }
    //-- end with validation Headers  ---

    return checkEventHeaders;
  
    } catch (error) {
      console.error(`ERROR in function validateHeadersAndKeys(). Caused by ${error} . Specific stack is ${error.stack} `);
    }
  
  }

  module.exports = {
validateHeadersAndKeys
  }