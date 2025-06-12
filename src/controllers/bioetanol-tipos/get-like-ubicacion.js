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
  getAllItemsWithFilter,
} = require('../../helpers/dynamodb/operations/get-all');

//Const-Vars
const BIOET_TIPO_TABLE_NAME = process.env.BIOET_TIPO_TABLE_NAME || '';
const BIOET_TIPO_KEY_DYNAMO = 'ubicacion';
const OK_CODE = statusCode.OK;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
let eventHeaders;
let checkEventHeadersAndKeys;
let validatePathParam;
let orderAt;
let items;
let ubicacion;
let msgResponse;
let msgLog;
let pageSizeNro;

/**
 * @description Function to obtain all the objects of the bioethanol types table according to the ubicacion
 * @param {Object} event Object type
 * @returns a response with the objects found
 */
module.exports.handler = async (event) => {
  try {
    //Init
    pageSizeNro = 5;
    orderAt = 'asc';

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
    validatePathParam = await validatePathParameters(event);

    if (!validatePathParam) {
      return await bodyResponse(
        BAD_REQUEST_CODE,
        'Bad request, check missing or malformed path parameters',
      );
    }

    ubicacion = await event.pathParameters.ubicacion;

    if (ubicacion == (null || undefined)) {
      return await bodyResponse(
        BAD_REQUEST_CODE,
        'Bad request, check missing or malformed path parameters',
      );
    }
    //-- end with path parameters  ---

    //-- start with dynamoDB operations  ---
    items = await getAllItemsWithFilter(
      BIOET_TIPO_TABLE_NAME,
      BIOET_TIPO_KEY_DYNAMO,
      ubicacion,
      pageSizeNro,
      orderAt
    );

    if (items == (null || undefined)) {
      return await bodyResponse(
        INTERNAL_SERVER_ERROR_CODE,
        'An error has occurred, failed to list database objects. Check if items exists.',
      );
    }
    //-- end with dynamoDB operations  ---

    return await bodyResponse(OK_CODE, items);
  } catch (error) {
    msgResponse = 'ERROR in get-like-ubicacion() function for bioetanol-tipos.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return await bodyResponse(INTERNAL_SERVER_ERROR_CODE, msgResponse);
  }
}; 