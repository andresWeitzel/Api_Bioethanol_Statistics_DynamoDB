//Enums
const { statusCode } = require("../../enums/http/status-code");
//Helpers
const { bodyResponse } = require("../../helpers/http/body-response");
const {
  validatePathParameters,
} = require("../../helpers/http/query-string-params");
const { getOneItem } = require("../../helpers/dynamodb/operations/get-one");
const {
  validateHeadersAndKeys,
} = require("../../helpers/validations/headers/validate-headers-keys");

//Const/Vars
const BIOET_PRECIOS_TABLE_NAME = process.env.BIOET_PRECIOS_TABLE_NAME || "";
const OK_CODE = statusCode.OK;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
let eventHeaders;
let checkEventHeadersAndKeys;
let validatePathParam;
let key;
let uuidParam;
let item;
let msgResponse;
let msgLog;

/**
 * @description Function to get a product of the bioethanol prices table according to id
 * @param {Object} event Object type
 * @returns a body response with http code and message
 */
module.exports.handler = async (event) => {
  try {
    //Init
    item = null;
    key = null;
    msgResponse = null;
    msgLog = null;
    uuidParam = null;
    validatePathParam = false;

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
    uuidParam = await event.pathParameters.uuid;

    if (uuidParam != (null && undefined)) {
      validatePathParam = await validatePathParameters(uuidParam);
    }

    if (!validatePathParam) {
      return await bodyResponse(
        BAD_REQUEST_CODE,
        `Bad request, check malformed id to get bioethanol prices based on your id ${uuidParam}`
      );
    }
    //-- end with path parameters  ---

    //-- start with dynamodb operations  ---

    key = { uuid: uuidParam };

    item = await getOneItem(BIOET_PRECIOS_TABLE_NAME, key);

    if (item == (null || undefined)) {
      return await bodyResponse(
        BAD_REQUEST_CODE,
        `The Bioetanol prices object with the requested id ${uuidParam} is not found in the database.`
      );
    }

    return await bodyResponse(OK_CODE, item);

    //-- end with dynamodb operations  ---
  } catch (error) {
    msgResponse =
      "ERROR in get-by-uuid controller function for bioethanol-prices.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return await bodyResponse(INTERNAL_SERVER_ERROR_CODE, msgResponse);
  }
};
