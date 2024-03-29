//Enums
const { statusCode } = require('../../enums/http/status-code');
//Helpers
const { bodyResponse } = require('../../helpers/http/body-response');
const { getAllItems } = require('../../helpers/dynamodb/operations/get-all');
const {
  validateHeadersAndKeys,
} = require('../../helpers/validations/headers/validate-headers-keys');
//Const
const BIOET_TOTAL_TABLE_NAME = process.env.BIOET_TOTAL_TABLE_NAME || '';
const OK_CODE = statusCode.OK;
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
//Vars
let eventHeaders;
let checkEventHeadersAndKeys;
let queryStrParams;
let pageSizeNro;
let orderAt;
let items;
let msgResponse;
let msgLog;

/**
 * @description Function to obtain all the objects of the bioethanol total table
 * @param {Object} event Object type
 * @returns a body response with http code and message
 */
module.exports.handler = async (event) => {
  try {
    //Init
    obj = null;
    items = null;
    pageSizeNro = 5;
    orderAt = 'asc';
    msgResponse = null;
    msgLog = null;

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

    //-- start with dynamodb operations  ---

    items = await getAllItems(BIOET_TOTAL_TABLE_NAME, pageSizeNro, orderAt);

    if (items == null || !items.length) {
      return await bodyResponse(
        INTERNAL_SERVER_ERROR_CODE,
        'An error has occurred, failed to list database objects',
      );
    }
    //-- end with dynamodb operations  ---

    return await bodyResponse(OK_CODE, items);
  } catch (error) {
    msgResponse = 'ERROR in get-all controller function for bioethanol-total.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return await bodyResponse(INTERNAL_SERVER_ERROR_CODE, msgResponse);
  }
};
