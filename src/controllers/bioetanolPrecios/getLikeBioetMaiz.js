//Enums
const { statusCode } = require("../../enums/http/statusCode");
const { value } = require("../../enums/general/values");
//Helpers
const { bodyResponse } = require("../../helpers/http/bodyResponse");
const {
    validateHeadersAndKeys,
  } = require("../../helpers/validations/headers/validateHeadersAndKeys");
const {
  validatePathParameters,
} = require("../../helpers/http/queryStringParams");
const {
  getAllItemsWithFilter,
} = require("../../helpers/dynamodb/operations/getAllDynamoDB");

//Const/Vars
const BIOET_PRECIOS_TABLE_NAME = process.env.BIOET_PRECIOS_TABLE_NAME;
const BIOET_PRECIOS_KEY_DYNAMO = "bioetMaiz";
let eventHeaders;
let validatePathParam;
let orderAt;
let items;
let bioetMaiz;
let msg;
let code;

/**
 * @description Function to obtain all the objects of the bioethanol prices table according to the bioethanol maiz prices
 * @param {Object} event Object type
 * @returns a body response with http code and message
 */
module.exports.handler = async (event) => {
  try {
    //Init
    items = value.IS_NULL;
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

    if (queryStrParams != value.IS_NULL) {
      pageSizeNro = parseInt(await event.queryStringParameters.limit);
      orderAt = await event.queryStringParameters.orderAt;
    }
    //-- end with pagination  ---

    //-- start with path parameters  ---
    bioetMaiz = await event.pathParameters.bioetMaiz;

    validatePathParam = await validatePathParameters(bioetMaiz);

    if (!validatePathParam) {
      return await bodyResponse(
        statusCode.BAD_REQUEST,
        "Bad request, check malformed bioetMaiz value"
      );
    }
    //-- end with path parameters  ---

    //-- start with dynamodb operations  ---

    items = await getAllItemsWithFilter(
      BIOET_PRECIOS_TABLE_NAME,
      BIOET_PRECIOS_KEY_DYNAMO,
      bioetMaiz,
      pageSizeNro,
      orderAt
    );

    if (items == value.IS_NULL || items == value.IS_UNDEFINED) {
      return await bodyResponse(
        statusCode.BAD_REQUEST,
        "The objects with the bioetMaiz value is not found in the database"
      );
    }
    //-- end with dynamodb operations  ---

    return await bodyResponse(statusCode.OK, items);
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in GET LIKE BIOET MAIZ lambda. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await bodyResponse(code, msg);
  }
};
