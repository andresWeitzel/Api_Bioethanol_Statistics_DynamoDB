//Enums
const { statusCode } = require('../../enums/http/status-code');
const { value } = require('../../enums/general/values');
//Helpers
const { bodyResponse } = require('../../helpers/http/body-response');
const { getAllItems } = require('../../helpers/dynamodb/operations/get-all');
const {
  validateHeadersAndKeys,
} = require('../../helpers/validations/headers/validate-headers-keys');

//Const/Vars
const BIOET_TIPO_TABLE_NAME = process.env.BIOET_TIPO_TABLE_NAME || '';
let eventHeaders;
let checkEventHeadersAndKeys;
let queryStrParams;
let pageSizeNro;
let orderAt;
let items;
let msgResponse;
let msgLog;

/**
 * @description Function to obtain all the objects of the bioethanol tipos table
 * @param {Object} event Object type
 * @returns a body response with http code and message
 */
module.exports.handler = async (event) => {
  try {
    //Init
    obj = value.IS_NULL;
    items = value.IS_NULL;
    msgResponse = null;
    msgLog = null;
    pageSizeNro = 5;
    orderAt = 'asc';

    //-- start with validation headers and keys  ---
    eventHeaders = await event.headers;

    checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

    if (checkEventHeadersAndKeys != value.IS_NULL) {
      return checkEventHeadersAndKeys;
    }
    //-- end with validation headers and keys  ---

    //-- start with pagination  ---
    queryStrParams = event.queryStringParameters;

    if (queryStrParams != value.IS_NULL) {
      pageSizeNro = parseInt(await event.queryStringParameters.limit);
      orderAt = await event.queryStringParameters.orderAt;
    }
    //-- end with pagination  ---

    //-- start with dynamodb operations  ---

    items = await getAllItems(BIOET_TIPO_TABLE_NAME, pageSizeNro, orderAt);

    if (items == value.IS_NULL || !items.length) {
      return await bodyResponse(
        statusCode.INTERNAL_SERVER_ERROR,
        'An error has occurred, failed to list database objects',
      );
    }
    //-- end with dynamodb operations  ---

    return await bodyResponse(statusCode.OK, items);
  } catch (error) {
    msgResponse = 'ERROR in get-all controller function for bioetanol-tipos.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return await bodyResponse(statusCode.INTERNAL_SERVER_ERROR, msgResponse);
  }
};
