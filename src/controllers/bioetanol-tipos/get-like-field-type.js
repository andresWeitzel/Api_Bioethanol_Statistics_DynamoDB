//Enums
const { statusCode } = require('../../enums/http/status-code');
const { value } = require('../../enums/general/values');
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

//Const-Vars
const BIOET_TIPO_TABLE_NAME = process.env.BIOET_TIPO_TABLE_NAME || '';
let eventHeaders;
let orderAt;
let items;
let fieldType;
let fieldValue;
let msgResponse;
let msgLog;

/**
 * @description Function to obtain all the objects of the bioethanol types table according to the to the field type
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
    fieldType = null;
    fieldValue = null;

    //-- start with validation headers and keys  ---
    eventHeaders = await event.headers;

    checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

    if (checkEventHeadersAndKeys != null) {
      return checkEventHeadersAndKeys;
    }
    //-- end with validation headers and keys  ---

    //-- start with pagination  ---
    queryStrParams = event.queryStringParameters;

    if (queryStrParams != (null && undefined)) {
      //fields
      fieldType = event.queryStringParameters.fieldType;
      fieldValue = event.queryStringParameters.fieldValue;
      //pagination
      pageSizeNro = parseInt(await event.queryStringParameters.limit);
      orderAt = await event.queryStringParameters.orderAt;
    }

    if (fieldType != (null && undefined)) {
      fieldType = fieldType.toLowerCase();
      switch (fieldType) {
        case 'uuid':
        case 'id':
          fieldType = 'uuid';
          break;
        case 'tipo':
        case 'type':
          fieldType = 'tipo';
          break;
        case 'periodo':
        case 'period':
          fieldType = 'periodo';
          break;
        case 'produccion':
        case 'producción':
        case 'production':
          fieldType = 'produccion';
          break;
        case 'ventas_totales':
        case 'ventastotales':
          fieldType = 'ventasTotales';
          break;
        case 'created_at':
        case 'createddat':
          fieldType = 'createdAt';
          break;
        case 'updated_at':
        case 'updateddat':
          fieldType = 'updatedAt';
          break;
        default:
          fieldType = null;
          break;
      }
    }
    if (fieldType == (null || undefined)) {
      return await bodyResponse(
        statusCode.BAD_REQUEST,
        "The fieldType must only be 'uuid' , 'tipo' , 'periodo', 'produccion', 'ventasTotales', 'createdAt' or 'updatedAt' ",
      );
    }
    if (fieldValue == (null || undefined)) {
      return await bodyResponse(
        statusCode.BAD_REQUEST,
        'The fieldValue must not be null or undefined',
      );
    }
    //-- end with pagination  ---

    //-- start with dynamodb operations  ---

    items = await getAllItemsWithFilter(
      BIOET_TIPO_TABLE_NAME,
      fieldType,
      fieldValue,
      pageSizeNro,
      orderAt,
    );

    if (items == null || items == value.IS_UNDEFINED) {
      return await bodyResponse(
        statusCode.BAD_REQUEST,
        'The objects with the field type and value is not found in the database',
      );
    }
    //-- end with dynamodb operations  ---

    return await bodyResponse(statusCode.OK, items);
  } catch (error) {
    msgResponse =
      'ERROR in get-like-field-type controller function for bioethanol-types.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return await bodyResponse(statusCode.INTERNAL_SERVER_ERROR, msgResponse);
  }
};
