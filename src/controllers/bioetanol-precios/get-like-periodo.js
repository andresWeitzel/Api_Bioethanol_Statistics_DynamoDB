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

//Const/Vars
const BIOET_PRECIOS_TABLE_NAME = process.env.BIOET_PRECIOS_TABLE_NAME || '';
const OK_CODE = statusCode.OK;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
let eventHeaders;
let validatePathParam;
let pageSizeNro;
let periodo;
let orderAt;
let items;
let msgResponse;
let msgLog;

/**
 * @description Function to obtain all the objects of the bioethanol prices table according to the periodo
 * @param {Object} event Object type
 * @returns a body response with http code and message
 */
module.exports.handler = async (event) => {
  try {
    //Init
    obj = null;
    items = null;
    msgResponse = null;
    msgLog = null;
    pageSizeNro = 20;
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

    //-- start with pagination  ---
    queryStrParams = event.queryStringParameters;

    if (queryStrParams != (null && undefined)) {
      pageSizeNro = queryStrParams.limit
        ? parseInt(queryStrParams.limit)
        : pageSizeNro;
      orderAt = queryStrParams.orderAt ? queryStrParams.orderAt : orderAt;
    }
    //-- end with pagination  ---

    //-- start with path parameters  ---
    periodo = await event.pathParameters.periodo;

    validatePathParam = await validatePathParameters(periodo);

    if (!validatePathParam) {
      return await bodyResponse(
        BAD_REQUEST_CODE,
        'Bad request, check malformed periodo value',
      );
    }
    //-- end with path parameters  ---

    //-- start with dynamodb operations  ---

    items = await getAllItemsWithFilter(
      BIOET_PRECIOS_TABLE_NAME,
      'periodo',
      periodo,
      pageSizeNro,
      orderAt,
    );

    if (items == (null || undefined) || !items.length) {
      return await bodyResponse(
        BAD_REQUEST_CODE,
        'The objects with the periodo value is not found in the database. Check if items exists.',
      );
    }
    //-- end with dynamodb operations  ---

    return await bodyResponse(OK_CODE, items);
  } catch (error) {
    msgResponse =
      'ERROR in get-like-periodo controller function for bioethanol-prices.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return await bodyResponse(INTERNAL_SERVER_ERROR_CODE, msgResponse);
  }
};
