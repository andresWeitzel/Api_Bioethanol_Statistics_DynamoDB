//Models
const { BioetanolTotal } = require('../../models/BioetanolTotal');
//Enums
const { statusCode } = require('../../enums/http/status-code');
//Helpers
const { bodyResponse } = require('../../helpers/http/body-response');
const {
  validateHeadersAndKeys,
} = require('../../helpers/validations/headers/validate-headers-keys');
const { insertItem } = require('../../helpers/dynamodb/operations/insert');
const { generateUUID } = require('../../helpers/math/generate-uuid');
const { formatToJson } = require('../../helpers/format/format-to-json');
const { formatToString } = require('../../helpers/format/format-to-string');
const {
  validateBodyAddItemParamsBioetTotal,
} = require('../../helpers/validations/validator/http/request-body-add-item-params');
const { currentDateTime } = require('../../helpers/date-time/dates');

//Const
const BIOET_TOTAL_TABLE_NAME = process.env.BIOET_TOTAL_TABLE_NAME || '';
const OK_CODE = statusCode.OK;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
//Vars
let eventHeaders;
let eventBody;
let validateBodyAddItem;
let checkEventHeadersAndKeys;
let item;
let newBioetTotal;
let uuid;
let periodo;
let produccion;
let ventasTotales;
let createdAt;
let msgResponse;
let msgLog;

/**
 * @description Function to insert one object into the bioethanol total table
 * @param {Object} event Object type
 * @returns a body response with http code and message
 */
module.exports.handler = async (event) => {
  try {
    //Init
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

    //-- start with body validations  ---

    eventBody = await formatToJson(event.body);

    validateBodyAddItem = await validateBodyAddItemParamsBioetTotal(eventBody);

    if (!validateBodyAddItem) {
      return await bodyResponse(
        BAD_REQUEST_CODE,
        'Bad request, check request body attributes. Missing or incorrect',
      );
    }
    //-- end with body validations  ---

    //-- start with dynamoDB operations  ---

    uuid = await generateUUID();
    uuid = await formatToString(uuid);
    periodo = await eventBody.periodo;
    produccion = await eventBody.produccion;
    ventasTotales = await eventBody.ventas_totales;
    createdAt = await currentDateTime();
    updatedAt = await currentDateTime();

    let bioetTotalObj = new BioetanolTotal(
      uuid,
      periodo,
      produccion,
      ventasTotales,
      createdAt,
      updatedAt,
    );

    item = {
      uuid: await bioetTotalObj.getUuid(),
      periodo: await bioetTotalObj.getPeriodo(),
      produccion: await bioetTotalObj.getProduccion(),
      ventasTotales: await bioetTotalObj.getVentasTotales(),
      createdAt: await bioetTotalObj.getCreatedAt(),
      updatedAt: await bioetTotalObj.getUpdatedAt(),
    };

    newBioetTotal = await insertItem(BIOET_TOTAL_TABLE_NAME, item);

    if (newBioetTotal == null || !newBioetTotal.length) {
      return await bodyResponse(
        INTERNAL_SERVER_ERROR_CODE,
        'An error has occurred, the object has not been inserted into the database',
      );
    }

    //-- end with dynamoDB operations  ---

    return await bodyResponse(OK_CODE, item);
  } catch (error) {
    msgResponse = 'ERROR in insert controller function for bioethanol-total.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return await bodyResponse(INTERNAL_SERVER_ERROR_CODE, msgResponse);
  }
};
