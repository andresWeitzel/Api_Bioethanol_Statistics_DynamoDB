//Enums
const { statusCode } = require("../../enums/http/status-code");
//Helpers
const { bodyResponse } = require("../../helpers/http/body-response");
const {
  validateHeadersAndKeys,
} = require("../../helpers/validations/headers/validate-headers-keys");
const {
  getAllItemsWithFilter,
} = require("../../helpers/dynamodb/operations/get-all");

//Const-Vars
const BIOET_PRECIOS_TABLE_NAME = process.env.BIOET_PRECIOS_TABLE_NAME || "";
const OK_CODE = statusCode.OK;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
let eventHeaders;
let orderAt;
let items;
let fieldType;
let fieldValue;
let msgResponse;
let msgLog;

/**
 * @description Function to obtain all the objects of the bioethanol prices table according to the field type
 * @param {Object} event Object type
 * @returns a body response with http code and message
 */
module.exports.handler = async (event) => {
  try {
    //Init
    items = null;
    pageSizeNro = 5;
    orderAt = "asc";
    msgResponse = null;
    msgLog = null;
    fieldType = "uuid";
    fieldValue = "a";

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
      //fields
      fieldType = queryStrParams.fieldType
        ? queryStrParams.fieldType
        : fieldType;
      fieldValue = queryStrParams.fieldValue ? queryStrParams.fieldValue : fieldValue;
      //pagination
      pageSizeNro = queryStrParams.limit
        ? parseInt(queryStrParams.limit)
        : pageSizeNro;
      orderAt = queryStrParams.orderAt ? queryStrParams.orderAt : orderAt;
    }

    if (fieldType != (null && undefined)) {
      fieldType = fieldType.toLowerCase();
      switch (fieldType) {
        case "uuid":
        case "id":
          fieldType = "uuid";
          break;
        case "periodo":
        case "period":
          fieldType = "periodo";
          break;
        case "bioetcanazucar":
        case "bioet_can_azucar":
        case "caña_azucar":
          fieldType = "bioetCanAzucar";
          break;
        case "bioetmaiz":
        case "bioet_maiz":
        case "bioet_maíz":
          fieldType = "bioetMaiz";
          break;
        case "created_at":
        case "createddat":
          fieldType = "createdAt";
          break;
        case "updated_at":
        case "updateddat":
          fieldType = "updatedAt";
          break;
        default:
          fieldType = null;
          break;
      }
    }
    if (fieldType == (null || undefined)) {
      return await bodyResponse(
        BAD_REQUEST_CODE,
        "The fieldType must only be 'uuid' , 'periodo', 'bioetCanAzucar', 'bioetMaiz', 'createdAt' or 'updatedAt' "
      );
    }
    if (fieldValue == (null || undefined)) {
      return await bodyResponse(
        BAD_REQUEST_CODE,
        "The fieldValue must not be null or undefined"
      );
    }
    //-- end with pagination  ---

    //-- start with dynamodb operations  ---

    items = await getAllItemsWithFilter(
      BIOET_PRECIOS_TABLE_NAME,
      fieldType,
      fieldValue,
      pageSizeNro,
      orderAt
    );


    if (items == (null || undefined) || !items.length) {
      return await bodyResponse(
        BAD_REQUEST_CODE,
        "The objects with the field type and value is not found in the database. Check if items exists."
      );
    }
    //-- end with dynamodb operations  ---

    return await bodyResponse(OK_CODE, items);
  } catch (error) {
    msgResponse =
      "ERROR in get-like-by-field-type controller function for bioethanol-prices.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return await bodyResponse(INTERNAL_SERVER_ERROR_CODE, msgResponse);
  }
};
