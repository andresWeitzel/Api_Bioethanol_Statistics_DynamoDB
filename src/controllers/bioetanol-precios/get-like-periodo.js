//Enums
const { statusCode } = require("../../enums/http/status-code");
const { value } = require("../../enums/general/values");
//Helpers
const { bodyResponse } = require("../../helpers/http/body-response");
const {
  validateHeadersAndKeys,
} = require("../../helpers/validations/headers/validate-headers-keys");
const {
  validatePathParameters,
} = require("../../helpers/http/query-string-params");
const {
  getAllItemsWithFilter,
} = require("../../helpers/dynamodb/operations/get-all");

//Const/Vars
let eventHeaders;
let validatePathParam;
let key;
let id;
let pageNro;
let periodo;
let orderAt;
let items;
const BIOET_PRECIOS_TABLE_NAME = process.env.BIOET_PRECIOS_TABLE_NAME;

/**
 * @description Function to obtain all the objects of the bioethanol prices table according to the periodo
 * @param {Object} event Object type
 * @returns a body response with http code and message
 */
module.exports.handler = async (event) => {
  try {
    //Init
    obj = null;
    id = "";
    items = null;
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
    periodo = await event.pathParameters.periodo;

    validatePathParam = await validatePathParameters(periodo);

    if (!validatePathParam) {
      return await bodyResponse(
        statusCode.BAD_REQUEST,
        "Bad request, check malformed periodo value"
      );
    }
    //-- end with path parameters  ---

    //-- start with dynamodb operations  ---

    items = await getAllItemsWithFilter(
      BIOET_PRECIOS_TABLE_NAME,
      "periodo",
      periodo,
      pageSizeNro,
      orderAt
    );

    if (items == null || !items.length) {
      return await bodyResponse(
        statusCode.BAD_REQUEST,
        "The objects with the periodo value is not found in the database"
      );
    }
    //-- end with dynamodb operations  ---

    return await bodyResponse(statusCode.OK, items);
  } catch (error) {
    console.log(`Error in getLikePeriodo lambda, caused by ${{ error }}`);
    console.error(error.stack);
    return await bodyResponse(
      statusCode.INTERNAL_SERVER_ERROR,
      "An unexpected error has occurred. Try again"
    );
  }
};
