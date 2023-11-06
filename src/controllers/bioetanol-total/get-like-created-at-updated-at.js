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

//Const
const BIOET_TOTAL_TABLE_NAME = process.env.BIOET_TOTAL_TABLE_NAME || '';
const OK_CODE = statusCode.OK;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
//Vars
let eventHeaders;
let checkEventHeadersAndKeys;
let validatePathParam;
let pageSizeNro;
let orderAt;
let itemsCreatedAt;
let itemsUpdatedAt;
let arrayItems;
let date;
let msgResponse;
let msgLog;

/**
 * @description Function to obtain all the objects of the bioethanol total table according to the updated or created date
 * @param {Object} event Object type
 * @returns a body response with http code and message
 */
module.exports.handler = async (event) => {
  try {
    //Init
    obj = null;
    itemsCreatedAt = null;
    itemsUpdatedAt = null;
    msgResponse = null;
    msgLog = null;
    arrayItems = [];
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
    date = await event.pathParameters.date;

    validatePathParam = await validatePathParameters(date);

    if (!validatePathParam) {
      return await bodyResponse(
        BAD_REQUEST_CODE,
        'Bad request, check malformed date value',
      );
    }
    //-- end with path parameters  ---

    //-- start with dynamodb operations  ---

    itemsCreatedAt = await getAllItemsWithFilter(
      BIOET_TOTAL_TABLE_NAME,
      'createdAt',
      date,
      pageSizeNro,
      orderAt,
    );
    if (itemsCreatedAt != null || itemsCreatedAt.length) {
      arrayItems.push(itemsCreatedAt);
    }

    if (itemsCreatedAt == null || !itemsCreatedAt.length) {
      itemsUpdatedAt = await getAllItemsWithFilter(
        BIOET_TOTAL_TABLE_NAME,
        'updatedAt',
        date,
        pageSizeNro,
        orderAt,
      );
      arrayItems.push(itemsUpdatedAt);
    }

    if (
      (itemsCreatedAt == null || !itemsCreatedAt.length) &&
      (itemsUpdatedAt == null || !itemsUpdatedAt.length)
    ) {
      return await bodyResponse(
        BAD_REQUEST_CODE,
        'The objects with the createdAt or updatedAt value is not found in the database',
      );
    }
    //-- end with dynamodb operations  ---

    return await bodyResponse(OK_CODE, arrayItems);
  } catch (error) {
    msgResponse =
      'ERROR in get-like-created-at-updated-at controller function for bioethanol-total.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return await bodyResponse(INTERNAL_SERVER_ERROR_CODE, msgResponse);
  }
};
