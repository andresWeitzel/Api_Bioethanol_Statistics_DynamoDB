//Enums
const { statusCode } = require("../../enums/http/status-code");
const { value } = require("../../enums/general/values");
//Helpers
const { bodyResponse } = require("../../helpers/http/body-response");
const {
  validateHeadersAndKeys
} = require("../../helpers/validations/headers/validate-headers-keys");
const {
  validatePathParameters
} = require("../../helpers/http/query-string-params");
const {
  deleteItemByUuid
} = require("../../helpers/dynamodb/operations/delete");

//Const/Vars
let eventHeaders;
let validatePathParam;
let itemDeleted;
let uuid;
const BIOET_TOTAL_TABLE_NAME = process.env.BIOET_TOTAL_TABLE_NAME;

/**
 * @description Function to delete one object from the bioethanol prices table
 * @param {Object} event Object type
 * @returns a body response with http code and message
 */
module.exports.handler = async (event) => {
  try {
    //Init
    itemDeleted = null;

    //-- start with validation headers and keys  ---
    eventHeaders = event.headers;

    checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

    if (checkEventHeadersAndKeys != value.IS_NULL) {
      return checkEventHeadersAndKeys;
    }
    //-- end with validation headers and keys  ---

    //-- start with path parameters  ---
    uuid = event.pathParameters.uuid;

    validatePathParam = await validatePathParameters(uuid);

    if (!validatePathParam) {
      return await bodyResponse(
        statusCode.BAD_REQUEST,
        "Bad request, check malformed uuid"
      );
    }
    //-- end with path parameters  ---

    //-- start with delete item dynamoDB operations  ---

    itemDeleted = await deleteItemByUuid(BIOET_TOTAL_TABLE_NAME, uuid);

    if (itemDeleted != true) {
      return await bodyResponse(
        statusCode.INTERNAL_SERVER_ERROR,
        `Unable to delete item based on uuid ${uuid}`
      );
    }

    //-- end with delete item dynamoDB operations  ---

    return await bodyResponse(
      statusCode.OK,
      `Successfully removed item based on uuid ${uuid}`
    );
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in delete bioetanol-total lambda. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await bodyResponse(code, msg);
  }
};