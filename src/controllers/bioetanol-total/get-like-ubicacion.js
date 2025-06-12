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
const { getAllItemsWithFilter } = require('../../helpers/dynamodb/operations/get-all');
//Const
const BIOET_TOTAL_TABLE_NAME = process.env.BIOET_TOTAL_TABLE_NAME || '';
const OK_CODE = statusCode.OK;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
//Vars
let eventHeaders;
let checkEventHeadersAndKeys;
let validatePathParam;
let queryStrParams;
let pageSizeNro;
let orderAt;
let ubicacion;
let items;
let msgResponse;
let msgLog;

/**
 * @description Function to get bioethanol total items by ubicacion
 * @param {Object} event Object type
 * @returns a body response with http code and message
 */
module.exports.handler = async (event) => {
  try {
    //Init
    items = null;
    pageSizeNro = 5;
    orderAt = 'asc';
    msgResponse = null;
    msgLog = null;


    //-- start with validation headers and keys  ---
    eventHeaders = await event.headers;

    if (eventHeaders) {
      checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);
    }

    if (checkEventHeadersAndKeys) {
      return checkEventHeadersAndKeys;
    }
    //-- end with validation headers and keys  ---

    //-- start with path parameters  ---
    ubicacion = await event.pathParameters.ubicacion;

    if (!ubicacion) {
      return await bodyResponse(
        BAD_REQUEST_CODE,
        'The ubicacion parameter is required',
      );
    }

    validatePathParam = await validatePathParameters(ubicacion);

    if (!validatePathParam) {
      return await bodyResponse(
        BAD_REQUEST_CODE,
        `Bad request, check malformed ubicacion ${ubicacion}`,
      );
    }
    //-- end with path parameters  ---

    //-- start with pagination  ---
    queryStrParams = event.queryStringParameters;

    if (queryStrParams) {
      pageSizeNro = queryStrParams.limit ? parseInt(queryStrParams.limit) : pageSizeNro;
      orderAt = queryStrParams.orderAt || orderAt;
    }
    //-- end with pagination  ---

    //-- start with dynamodb operations  ---


    items = await getAllItemsWithFilter(
      BIOET_TOTAL_TABLE_NAME,
      'ubicacion',
      ubicacion,
      pageSizeNro,
      orderAt
    );



    if (!items || !items.length) {
      console.log('No items found');
      return await bodyResponse(
        OK_CODE,
        [],
      );
    }
    //-- end with dynamodb operations  ---

    return await bodyResponse(OK_CODE, items);
  } catch (error) {
    msgResponse = 'ERROR in get-like-ubicacion controller function for bioethanol-total.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return await bodyResponse(INTERNAL_SERVER_ERROR_CODE, msgResponse);
  }
}; 