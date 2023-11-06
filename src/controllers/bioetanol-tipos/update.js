//Models
const { BioetanolTipo } = require('../../models/BioetanolTipo');
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
  validateBodyAddItemParamsBioetTipos,
} = require('../../helpers/validations/validator/http/request-body-add-item-params');
const { currentDateTime } = require('../../helpers/date-time/dates');
const {
  validatePathParameters,
} = require('../../helpers/http/query-string-params');
const { getOneItem } = require('../../helpers/dynamodb/operations/get-one');
const { updateOneItem } = require('../../helpers/dynamodb/operations/update');
//Const
const BIOET_TIPO_TABLE_NAME = process.env.BIOET_TIPO_TABLE_NAME || '';
const OK_CODE = statusCode.OK;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
let eventHeaders;
let eventBody;
let validateBodyAddItem;
let validatePathParam;
let oldItem;
let updatedBioetTipo;
let uuid;
let newItem;
let newBioetanolTipoObj;
let msgResponse;
let msgLog;

/**
 * @description Function to update one object into the bioethanol types table
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

    validatePathParam = await validatePathParameters(uuid);

    if (!validatePathParam) {
      return await bodyResponse(
        BAD_REQUEST_CODE,
        'Bad request, check malformed uuid',
      );
    }
    //-- end with path parameters  ---

    //-- start with body validations  ---

    eventBody = await formatToJson(event.body);

    validateBodyAddItem = await validateBodyAddItemParamsBioetTipos(eventBody);

    if (!validateBodyAddItem) {
      return await bodyResponse(
        BAD_REQUEST_CODE,
        'Bad request, check request body attributes for bioetanol-tipos. Missing or incorrect',
      );
    }
    //-- end with body validations  ---

    //-- start with old item dynamoDB operations  ---

    key = { uuid: uuid };

    oldItem = await getOneItem(BIOET_TIPO_TABLE_NAME, key);

    if (oldItem == (null || undefined)) {
      return await bodyResponse(
        INTERNAL_SERVER_ERROR_CODE,
        `Internal Server Error. Unable to update object in db as failed to get a item by uuid ${uuid} . Check if the item exists in the database and try again.`,
      );
    }
    //-- end with old item dynamoDB operations  ---

    //-- start with new item dynamoDB operations  ---

    newBioetanolTipoObj = new BioetanolTipo(
      uuid,
      eventBody.tipo,
      eventBody.periodo,
      eventBody.produccion,
      eventBody.ventas_totales,
      await currentDateTime(),
      await currentDateTime(),
    );

    newItem = {
      tipo: newBioetanolTipoObj.getTipo(),
      periodo: newBioetanolTipoObj.getPeriodo(),
      produccion: newBioetanolTipoObj.getProduccion(),
      ventas_totales: newBioetanolTipoObj.getVentasTotales(),
      updatedAt: newBioetanolTipoObj.getUpdatedAt(),
    };

    updatedBioetTipo = await updateOneItem(BIOET_TIPO_TABLE_NAME, key, newItem);

    if (updatedBioetTipo == (null || undefined)) {
      return await bodyResponse(
        INTERNAL_SERVER_ERROR_CODE,
        'An error has occurred, the object has not been updated into the database',
      );
    }

    //-- end with new item dynamoDB operations  ---

    return await bodyResponse(OK_CODE, updatedBioetTipo);
  } catch (error) {
    msgResponse = 'ERROR in update controller function for bioethanol-types.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return await bodyResponse(INTERNAL_SERVER_ERROR_CODE, msgResponse);
  }
};
