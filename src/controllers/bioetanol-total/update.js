//Models
const { BioetanolTotal } = require('../../models/BioetanolTotal');
//Enums
const { statusCode } = require('../../enums/http/status-code');
//Helpers
const { bodyResponse } = require('../../helpers/http/body-response');
const {
  validateHeadersAndKeys,
} = require('../../helpers/validations/headers/validate-headers-keys');
const { formatToJson } = require('../../helpers/format/format-to-json');
const { formatToString } = require('../../helpers/format/format-to-string');
const {
  validateBodyAddItemParamsBioetTotal,
} = require('../../helpers/validations/validator/http/request-body-add-item-params');
const { currentDateTime } = require('../../helpers/date-time/dates');
const {
  validatePathParameters,
} = require('../../helpers/http/query-string-params');
const { getOneItem } = require('../../helpers/dynamodb/operations/get-one');
const { updateOneItem } = require('../../helpers/dynamodb/operations/update');

//Const/Vars
const BIOET_TOTAL_TABLE_NAME = process.env.BIOET_TOTAL_TABLE_NAME || '';
const OK_CODE = statusCode.OK;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
let eventHeaders;
let eventBody;
let validateBodyAddItem;
let validatePathParam;
let oldItem;
let updatedBioetTotal;
let uuid;
let newItem;
let newBioetanolTotalObj;
let msgResponse;
let msgLog;
let key;

/**
 * @description Function to update one object into the bioethanol total table
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

    //-- start with path parameters  ---
    uuid = await formatToString(event.pathParameters.uuid);

    validatePathParam = await validatePathParameters(event);

    if (!validatePathParam) {
      return await bodyResponse(
        BAD_REQUEST_CODE,
        'Bad request, the uuid parameter is required'
      );
    }
    //-- end with path parameters  ---

    //-- start with body validations  ---
    eventBody = await formatToJson(event.body);

    const validationResult = await validateBodyAddItemParamsBioetTotal(eventBody);

    if (!validationResult.isValid) {
      let errorMessage = 'Bad request, check request body attributes:\n';
      
      for (const [field, error] of Object.entries(validationResult.errors)) {
        errorMessage += `- ${field}: ${error.message}\n`;
      }

      return await bodyResponse(
        BAD_REQUEST_CODE,
        errorMessage.trim()
      );
    }
    //-- end with body validations  ---

    //-- start with old item dynamoDB operations  ---
    key = { uuid: uuid };

    try {
      oldItem = await getOneItem(BIOET_TOTAL_TABLE_NAME, key);
      
      if (!oldItem) {
        return await bodyResponse(
          BAD_REQUEST_CODE,
          `The Bioetanol total object with the requested id ${uuid} is not found in the database.`
        );
      }
    } catch (error) {
      msgResponse = 'ERROR in getOneItem() function.';
      msgLog = msgResponse + `Caused by ${error}`;
      console.log(msgLog);

      return await bodyResponse(
        INTERNAL_SERVER_ERROR_CODE,
        'Internal Server Error. Unable to update object in db as failed to get a item by uuid ' +
          uuid +
          ' . Check if the item exists in the database and try again.'
      );
    }
    //-- end with old item dynamoDB operations  ---

    //-- start with new item dynamoDB operations  ---
    newBioetanolTotalObj = new BioetanolTotal(
      uuid,
      eventBody.periodo,
      eventBody.produccion,
      eventBody.ventas_totales,
      eventBody.capacidad_instalada,
      eventBody.eficiencia_produccion,
      eventBody.ubicacion,
      eventBody.estado_operativo,
      eventBody.observaciones,
      oldItem.createdAt,
      await currentDateTime()
    );

    newItem = {
      periodo: newBioetanolTotalObj.getPeriodo(),
      produccion: newBioetanolTotalObj.getProduccion(),
      ventasTotales: newBioetanolTotalObj.getVentasTotales(),
      capacidadInstalada: newBioetanolTotalObj.getCapacidadInstalada(),
      eficienciaProduccion: newBioetanolTotalObj.getEficienciaProduccion(),
      ubicacion: newBioetanolTotalObj.getUbicacion(),
      estadoOperativo: newBioetanolTotalObj.getEstadoOperativo(),
      observaciones: newBioetanolTotalObj.getObservaciones(),
      updatedAt: newBioetanolTotalObj.getUpdatedAt()
    };

    try {
      updatedBioetTotal = await updateOneItem(BIOET_TOTAL_TABLE_NAME, key, newItem);
    } catch (error) {
      msgResponse = 'ERROR in updateOneItem() function.';
      msgLog = msgResponse + `Caused by ${error}`;
      console.log(msgLog);

      return await bodyResponse(
        INTERNAL_SERVER_ERROR_CODE,
        'An error has occurred, failed to update database object.'
      );
    }

    if (!updatedBioetTotal) {
      return await bodyResponse(
        INTERNAL_SERVER_ERROR_CODE,
        'An error has occurred, failed to update database object.'
      );
    }

    //-- end with new item dynamoDB operations  ---

    return await bodyResponse(OK_CODE, updatedBioetTotal);
  } catch (error) {
    msgResponse = 'ERROR in update controller function for bioethanol-total.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return await bodyResponse(INTERNAL_SERVER_ERROR_CODE, msgResponse);
  }
};
