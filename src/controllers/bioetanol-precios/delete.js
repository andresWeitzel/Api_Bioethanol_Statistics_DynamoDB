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

//Const-Vars
const BIOET_PRECIOS_TABLE_NAME = process.env.BIOET_PRECIOS_TABLE_NAME || '';
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

    itemDeleted = await deleteItemByUuid(BIOET_PRECIOS_TABLE_NAME, uuid);

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

    msgResponse = 'ERROR in delete controller function for bioethanol-prices.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return await bodyResponse(
      statusCode.INTERNAL_SERVER_ERROR,
      msgResponse
    );
  }
};
