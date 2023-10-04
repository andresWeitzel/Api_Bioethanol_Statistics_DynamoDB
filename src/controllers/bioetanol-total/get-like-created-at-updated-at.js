//Enums
const { statusCode } = require("../../enums/http/status-code");
const { value } = require("../../enums/general/values");
//Helpers
const { bodyResponse } = require("../../helpers/http/body-response");
const {
  validateHeadersAndKeys
} = require("../../helpers/validations/headers/validate-headers-keys");
const {
  validatePathParameters
} = require("../../helpers/http/query-string-params");
const {
  getAllItemsWithFilter
} = require("../../helpers/dynamodb/operations/get-all");

//Const/Vars
let eventHeaders;
let checkEventHeadersAndKeys;
let validatePathParam;
let pageSizeNro;
let orderAt;
let itemsCreatedAt;
let itemsUpdatedAt;
let arrayItems;
let date;
const BIOET_TOTAL_TABLE_NAME = process.env.BIOET_TOTAL_TABLE_NAME;

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
    arrayItems = [];
    pageSizeNro = 5;
    orderAt = "asc";

    //-- start with validation headers and keys  ---
    eventHeaders = await event.headers;

    checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

    if (checkEventHeadersAndKeys != value.IS_NULL) {
      return checkEventHeadersAndKeys;
    }
    //-- end with validation headers and keys  ---

    //-- start with pagination  ---
    queryStrParams = event.queryStringParameters;

    if (queryStrParams != null) {
      pageSizeNro = parseInt(await event.queryStringParameters.limit);
      orderAt = await event.queryStringParameters.orderAt;
    }
    //-- end with pagination  ---

    //-- start with path parameters  ---
    date = await event.pathParameters.date;

    validatePathParam = await validatePathParameters(date);

    if (!validatePathParam) {
      return await bodyResponse(
        statusCode.BAD_REQUEST,
        "Bad request, check malformed date value"
      );
    }
    //-- end with path parameters  ---

    //-- start with dynamodb operations  ---

    itemsCreatedAt = await getAllItemsWithFilter(
      BIOET_TOTAL_TABLE_NAME,
      "createdAt",
      date,
      pageSizeNro,
      orderAt
    );
    if (itemsCreatedAt != null || itemsCreatedAt.length) {
      arrayItems.push(itemsCreatedAt);
    }

    if (itemsCreatedAt == null || !itemsCreatedAt.length) {
      itemsUpdatedAt = await getAllItemsWithFilter(
        BIOET_TOTAL_TABLE_NAME,
        "updatedAt",
        date,
        pageSizeNro,
        orderAt
      );
      arrayItems.push(itemsUpdatedAt);
    }

    if (
      (itemsCreatedAt == null || !itemsCreatedAt.length) &&
      (itemsUpdatedAt == null || !itemsUpdatedAt.length)
    ) {
      return await bodyResponse(
        statusCode.BAD_REQUEST,
        "The objects with the createdAt or updatedAt value is not found in the database"
      );
    }
    //-- end with dynamodb operations  ---

    return await bodyResponse(statusCode.OK, arrayItems);
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in get-like-created-at-updated-at bioetanol-total lambda. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await bodyResponse(code, msg);
  }
};
