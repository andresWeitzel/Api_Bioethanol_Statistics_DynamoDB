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
//Const
const BIOET_TOTAL_TABLE_NAME = process.env.BIOET_TOTAL_TABLE_NAME || '';
const OK_CODE = statusCode.OK;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
//Vars
let eventHeaders;
let checkEventHeadersAndKeys;
let queryStrParams;
let pageSizeNro;
let orderAt;
let items;
let fieldType;
let fieldValue;
let msgResponse;
let msgLog;

/**
 * @description Function to obtain all the objects of the bioethanol total table according to the field type
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

    if (eventHeaders) {
      checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);
    }

    if (checkEventHeadersAndKeys) {
      return checkEventHeadersAndKeys;
    }
    //-- end with validation headers and keys  ---

    //-- start with pagination  ---
    queryStrParams = event.queryStringParameters;

    if (queryStrParams) {
      //fields
      fieldType = queryStrParams.fieldType || null;
      fieldValue = queryStrParams.fieldValue || null;
      //pagination
      pageSizeNro = queryStrParams.limit ? parseInt(queryStrParams.limit) : pageSizeNro;
      orderAt = queryStrParams.orderAt || orderAt;
    }

    if (!fieldType) {
      return await bodyResponse(
        BAD_REQUEST_CODE,
        'The fieldType parameter is required',
      );
    }

    if (!fieldValue) {
      return await bodyResponse(
        BAD_REQUEST_CODE,
        'The fieldValue parameter is required',
      );
    }

    fieldType = fieldType.toLowerCase();
    switch (fieldType) {
      case 'uuid':
      case 'id':
        fieldType = 'uuid';
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
      case 'capacidad_instalada':
      case 'capacidadinstalada':
        fieldType = 'capacidadInstalada';
        break;
      case 'eficiencia_produccion':
      case 'eficienciaproduccion':
        fieldType = 'eficienciaProduccion';
        break;
      case 'ubicacion':
      case 'ubicación':
        fieldType = 'ubicacion';
        break;
      case 'estado_operativo':
      case 'estadooperativo':
        fieldType = 'estadoOperativo';
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
        return await bodyResponse(
          BAD_REQUEST_CODE,
          "The fieldType must only be 'uuid', 'periodo', 'produccion', 'ventasTotales', 'capacidadInstalada', 'eficienciaProduccion', 'ubicacion', 'estadoOperativo', 'createdAt' or 'updatedAt'",
        );
    }

    //-- end with pagination  ---

    //-- start with dynamodb operations  ---
    items = await getAllItemsWithFilter(
      BIOET_TOTAL_TABLE_NAME,
      fieldType,
      fieldValue,
      pageSizeNro,
      orderAt,
    );

    if (!items || !items.length) {
      return await bodyResponse(
        OK_CODE,
        [],
      );
    }
    //-- end with dynamodb operations  ---

    return await bodyResponse(OK_CODE, items);
  } catch (error) {
    msgResponse =
      'ERROR in get-like-field-type controller function for bioethanol-total.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return await bodyResponse(INTERNAL_SERVER_ERROR_CODE, msgResponse);
  }
};
