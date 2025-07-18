//Models
const { BioetanolPrecio } = require('../../models/BioetanolPrecio');
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
  validateBodyAddItemParamsBioetPrecios,
} = require('../../helpers/validations/validator/http/request-body-add-item-params');
const { currentDateTime } = require('../../helpers/date-time/dates');
const {
  validatePathParameters,
} = require('../../helpers/http/query-string-params');
const { getOneItem } = require('../../helpers/dynamodb/operations/get-one');
const { updateOneItem } = require('../../helpers/dynamodb/operations/update');

//Const
const BIOET_PRECIOS_TABLE_NAME = process.env.BIOET_PRECIOS_TABLE_NAME || '';
const OK_CODE = statusCode.OK;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
//Vars
let eventHeaders;
let eventBody;
let validateBodyAddItem;
let validatePathParam;
let oldItem;
let updatedBioetPrecio;
let uuid;
let newItem;
let newBioetanolPrecioObj;
let msgResponse;
let msgLog;

/**
 * @description Function to update one object into the bioethanol prices table
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

    validateBodyAddItem = await validateBodyAddItemParamsBioetPrecios(
      eventBody,
    );

    if (!validateBodyAddItem) {
      return await bodyResponse(
        BAD_REQUEST_CODE,
        'Bad request, check request body attributes for bioetanol-precios. Missing or incorrect',
      );
    }
    //-- end with body validations  ---

    //-- start with old item dynamoDB operations  ---

    key = { uuid: uuid };

    oldItem = await getOneItem(BIOET_PRECIOS_TABLE_NAME, key);

    if (oldItem == (null || undefined)) {
      return await bodyResponse(
        INTERNAL_SERVER_ERROR_CODE,
        `Internal Server Error. Unable to update object in db as failed to get a item by uuid ${uuid} . Check if the item exists in the database and try again.`,
      );
    }
    //-- end with old item dynamoDB operations  ---

    //-- start with new item dynamoDB operations  ---

    newBioetanolPrecioObj = new BioetanolPrecio(
      uuid,
      eventBody.periodo,
      eventBody.bioetanol_azucar,
      eventBody.bioetanol_maiz,
      eventBody.unidad_medida,
      eventBody.fuente_datos,
      eventBody.region,
      eventBody.variacion_anual,
      eventBody.variacion_mensual,
      eventBody.observaciones,
      oldItem.createdAt,
      await currentDateTime()
    );

    newItem = {
      periodo: newBioetanolPrecioObj.getPeriodo(),
      bioetCanAzucar: newBioetanolPrecioObj.getBioetCanAzucar(),
      bioetMaiz: newBioetanolPrecioObj.getBioetMaiz(),
      unidadMedida: newBioetanolPrecioObj.getUnidadMedida(),
      fuenteDatos: newBioetanolPrecioObj.getFuenteDatos(),
      region: newBioetanolPrecioObj.getRegion(),
      variacionAnual: newBioetanolPrecioObj.getVariacionAnual(),
      variacionMensual: newBioetanolPrecioObj.getVariacionMensual(),
      observaciones: newBioetanolPrecioObj.getObservaciones(),
      updatedAt: newBioetanolPrecioObj.getUpdatedAt()
    };

    updatedBioetPrecio = await updateOneItem(
      BIOET_PRECIOS_TABLE_NAME,
      key,
      newItem,
    );

    if (updatedBioetPrecio == (null || undefined)) {
      return await bodyResponse(
        INTERNAL_SERVER_ERROR_CODE,
        'An error has occurred, the object has not been updated into the database',
      );
    }

    //-- end with new item dynamoDB operations  ---

    return await bodyResponse(OK_CODE, updatedBioetPrecio);
  } catch (error) {
    msgResponse = 'ERROR in update controller function for bioethanol-prices.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return await bodyResponse(INTERNAL_SERVER_ERROR_CODE, msgResponse);
  }
};
