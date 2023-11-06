//Enums
const { statusCode } = require('../../enums/http/status-code');
//Helpers
const { bodyResponse } = require('../../helpers/http/body-response');
const {
  validateHeadersAndKeys,
} = require('../../helpers/validations/headers/validate-headers-keys');
const {
  validatePathParameters,
} = require('../../helpers/http/query-string-params');
const {
  deleteItemByUuid,
} = require('../../helpers/dynamodb/operations/delete');
//Const
const BIOET_TOTAL_TABLE_NAME = process.env.BIOET_TOTAL_TABLE_NAME || '';
const OK_CODE = statusCode.OK;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
//Vars
let eventHeaders;
let validatePathParam;
let itemDeleted;
let uuid;
let msgResponse;
let msgLog;

/**
 * @description Function to delete one object from the bioethanol prices table
 * @param {Object} event Object type
 * @returns a body response with http code and message
 */
module.exports.handler = async (event) => {
  try {
    //Init
    itemDeleted = null;
    msgResponse = null;
    msgLog = null;

    //-- start with validation headers and keys  ---
    eventHeaders = await event.headers;

    if (eventHeaders != (null && undefined)) {
      checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);
    }

    if (checkEventHeadersAndKeys != (null && undefined)) {
      return checkEventHeadersAndKeys;
    }
    //-- end with validation headers and keys  ---

    //-- start with path parameters  ---
    uuid = event.pathParameters.uuid;

    if (uuid != (null && undefined)) {
      validatePathParam = await validatePathParameters(uuid);
    }

    if (!validatePathParam) {
      return await bodyResponse(
        BAD_REQUEST_CODE,
        'Bad request, check malformed uuid',
      );
    }
    //-- end with path parameters  ---

    //-- start with delete item dynamoDB operations  ---

    itemDeleted = await deleteItemByUuid(BIOET_TOTAL_TABLE_NAME, uuid);

    if (itemDeleted != true) {
      return await bodyResponse(
        INTERNAL_SERVER_ERROR_CODE,
        `Unable to delete item based on uuid ${uuid}`,
      );
    }

    //-- end with delete item dynamoDB operations  ---

    return await bodyResponse(
      OK_CODE,
      `Successfully removed item based on uuid ${uuid}`,
    );
  } catch (error) {
    msgResponse = 'ERROR in delete controller function for bioethanol-total.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return await bodyResponse(INTERNAL_SERVER_ERROR_CODE, msgResponse);
  }
};
