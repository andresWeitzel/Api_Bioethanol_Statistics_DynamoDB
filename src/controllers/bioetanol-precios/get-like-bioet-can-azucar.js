//Enums
const { statusCode } = require('../../enums/http/status-code');
//Helpers
const { bodyResponse } = require('../../helpers/http/body-response');
const {
  validateHeadersAndKeys,
} = require('../../helpers/validations/headers/validate-headers-keys');
const {
  getAllItemsWithFilter,
} = require('../../helpers/dynamodb/operations/get-all');
const {
  validatePathParameters,
} = require('../../helpers/http/query-string-params');

//Const/Vars
const BIOET_PRECIOS_TABLE_NAME = process.env.BIOET_PRECIOS_TABLE_NAME || '';
const BIOET_PRECIOS_KEY_DYNAMO = 'bioetCanAzucar';
const OK_CODE = statusCode.OK;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
let eventHeaders;
let checkEventHeadersAndKeys;
let validatePathParam;
let orderAt;
let items;
let bioetCanAzucar;
let msgResponse;
let msgLog;

/**
 * @description Function to obtain all the objects of the bioethanol prices table according to the bioethanol caña azucar prices
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

    checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

    if (checkEventHeadersAndKeys != (null && undefined)) {
      return checkEventHeadersAndKeys;
    }
    //-- end with validation headers and keys  ---

    //-- start with pagination  ---
    queryStrParams = event.queryStringParameters;

    if (queryStrParams != (null && undefined)) {
      pageSizeNro = parseInt(await event.queryStringParameters.limit);
      orderAt = await event.queryStringParameters.orderAt;
    }
    //-- end with pagination  ---

    //-- start with path parameters  ---
    bioetCanAzucar = await event.pathParameters.bioetCanAzucar;

    validatePathParam = await validatePathParameters(bioetCanAzucar);

    if (!validatePathParam) {
      return await bodyResponse(
        BAD_REQUEST_CODE,
        'Bad request, check malformed bioetCanAzucar value',
      );
    }
    //-- end with path parameters  ---

    //-- start with dynamodb operations  ---

    items = await getAllItemsWithFilter(
      BIOET_PRECIOS_TABLE_NAME,
      BIOET_PRECIOS_KEY_DYNAMO,
      bioetCanAzucar,
      pageSizeNro,
      orderAt,
    );

    if (items == (null || undefined)) {
      return await bodyResponse(
        BAD_REQUEST_CODE,
        'The objects with the bioetCanAzucar value is not found in the database',
      );
    }
    //-- end with dynamodb operations  ---

    return await bodyResponse(OK_CODE, items);
  } catch (error) {
    msgResponse =
      'ERROR in get-like-bioet-can-azucar controller function for bioethanol-prices.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return await bodyResponse(INTERNAL_SERVER_ERROR_CODE, msgResponse);
  }
};
