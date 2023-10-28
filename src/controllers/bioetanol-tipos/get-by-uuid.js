//Enums
const { statusCode } = require('../../enums/http/status-code');
const { value } = require('../../enums/general/values');
//Helpers
const { bodyResponse } = require('../../helpers/http/body-response');
const {
  validatePathParameters,
} = require('../../helpers/http/query-string-params');
const { getOneItem } = require('../../helpers/dynamodb/operations/get-one');
const {
  validateHeadersAndKeys,
} = require('../../helpers/validations/headers/validate-headers-keys');

//Const/Vars
const BIOET_TIPO_TABLE_NAME = process.env.BIOET_TIPO_TABLE_NAME || '';
let eventHeaders;
let checkEventHeadersAndKeys;
let validatePathParam;
let key;
let uuidParam;
let item;
let msgResponse;
let msgLog;

/**
 * @description Function to get a product of the bioethanol types table according to id
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

    //-- start with validation headers and keys  ---
    eventHeaders = await event.headers;

    checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

    if (checkEventHeadersAndKeys != null) {
      return checkEventHeadersAndKeys;
    }
    //-- end with validation headers and keys  ---

    //-- start with path parameters  ---
    uuidParam = await event.pathParameters.uuid;

    validatePathParam = await validatePathParameters(uuidParam);

    if (!validatePathParam) {
      return await bodyResponse(
        statusCode.BAD_REQUEST,
        'Bad request, check malformed id to get bioetanol tipos based on your uuid',
      );
    }
    //-- end with path parameters  ---

    //-- start with dynamodb operations  ---

    key = { uuid: uuidParam };

    item = await getOneItem(BIOET_TIPO_TABLE_NAME, key);

    if (item == (null || undefined)) {
      return await bodyResponse(
        statusCode.BAD_REQUEST,
        'The Bioetanol tipos object with the requested uuid is not found in the database',
      );
    }

    return await bodyResponse(statusCode.OK, item);

    //-- end with dynamodb operations  ---
  } catch (error) {
    msgResponse =
      'ERROR in get-by-uuid controller function for bioetanol-tipos.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return await bodyResponse(statusCode.INTERNAL_SERVER_ERROR, msgResponse);
  }
};
