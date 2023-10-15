//Enums
const { statusCode } = require("../../enums/http/status-code");
const { value } = require("../../enums/general/values");
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
const BIOET_TOTAL_TABLE_NAME = process.env.BIOET_TOTAL_TABLE_NAME || "";
let eventHeaders;
let checkEventHeadersAndKeys;
let validatePathParam;
let key;
let uuidParam;
let item;
let msgResponse;
let msgLog;

/**
 * @description Function to get a product of the bioethanol total table according to id
 * @param {Object} event Object type
 * @returns a body response with http code and message
 */
module.exports.handler = async (event) => {
  try {
    //Init
    item = value.IS_NULL;
    key = value.IS_NULL;
    msgResponse = null;
    msgLog = null;

    //-- start with validation headers and keys  ---
    eventHeaders = await event.headers;

    checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

    if (checkEventHeadersAndKeys != value.IS_NULL) {
      return checkEventHeadersAndKeys;
    }
    //-- end with validation headers and keys  ---

    //-- start with path parameters  ---
    uuidParam = await event.pathParameters.uuid;

    validatePathParam = await validatePathParameters(uuidParam);

    if (!validatePathParam) {
      return await bodyResponse(
        statusCode.BAD_REQUEST,
        "Bad request, check malformed id to get bioethanol total based on your id"
      );
    }
    //-- end with path parameters  ---

    //-- start with dynamodb operations  ---

    key = { uuid: uuidParam };

    item = await getOneItem(BIOET_TOTAL_TABLE_NAME, key);

    if (item == value.IS_NULL || item.IS_UNDEFINED) {
      return await bodyResponse(
        statusCode.BAD_REQUEST,
        "The Bioetanol total object with the requested id is not found in the database"
      );
    }

    return await bodyResponse(statusCode.OK, item);

    //-- end with dynamodb operations  ---
  } catch (error) {
    msgResponse =
      "ERROR in get-by-uuid controller function for bioethanol-total.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return await bodyResponse(statusCode.INTERNAL_SERVER_ERROR, msgResponse);
  }
};
