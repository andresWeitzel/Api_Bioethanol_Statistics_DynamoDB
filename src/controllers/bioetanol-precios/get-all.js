//Enums
const { statusCode } = require('../../enums/http/status-code');
//Helpers
const { bodyResponse } = require('../../helpers/http/body-response');
const { getAllItems } = require('../../helpers/dynamodb/operations/get-all');
const {
  validateHeadersAndKeys,
} = require('../../helpers/validations/headers/validate-headers-keys');

//Const/Vars
const BIOET_PRECIOS_TABLE_NAME = process.env.BIOET_PRECIOS_TABLE_NAME || '';
const OK_CODE = statusCode.OK;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
let eventHeaders;
let checkEventHeadersAndKeys;
let queryStrParams;
let pageSizeNro;
let orderAt;
let items;
let msgResponse;
let msgLog;

/**
 * @description Function to obtain all the objects of the bioethanol prices table
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
    pageSizeNro = 5;
    orderAt = 'asc';

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

    //-- start with dynamodb operations  ---

    items = await getAllItems(BIOET_PRECIOS_TABLE_NAME, pageSizeNro, orderAt);

    if (items == null || !items.length) {
      return await bodyResponse(
        INTERNAL_SERVER_ERROR_CODE,
        'An error has occurred, failed to list database objects',
      );
    }
    //-- end with dynamodb operations  ---

    return await bodyResponse(OK_CODE, items);
  } catch (error) {
    msgResponse = 'ERROR in get-all controller function for bioethanol-prices.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return await bodyResponse(INTERNAL_SERVER_ERROR_CODE, msgResponse);
  }
};
