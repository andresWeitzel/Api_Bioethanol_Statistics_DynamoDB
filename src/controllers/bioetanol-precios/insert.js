//Models
const { BioetanolPrecio } = require('../../models/BioetanolPrecio');
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
  validateBodyAddItemParamsBioetPrecios,
} = require('../../helpers/validations/validator/http/request-body-add-item-params');
const { currentDateTime } = require('../../helpers/date-time/dates');

//Const-Vars
const BIOET_PRECIOS_TABLE_NAME = process.env.BIOET_PRECIOS_TABLE_NAME || '';
const OK_CODE = statusCode.OK;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
let eventHeaders;
let eventBody;
let validateBodyAddItem;
let checkEventHeadersAndKeys;
let item;
let newBioetPrecio;
let uuid;
let periodo;
let bioetCanAzucar;
let bioetMaiz;
let createdAt;
let updatedAt;
let msgResponse;
let msgLog;

/**
 * @description Function to insert one object into the bioethanol prices table
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

    validateBodyAddItem = await validateBodyAddItemParamsBioetPrecios(
      eventBody,
    );

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
    bioetCanAzucar = await eventBody.bioetanol_azucar;
    bioetMaiz = await eventBody.bioetanol_maiz;
    const unidadMedida = await eventBody.unidad_medida;
    const fuenteDatos = await eventBody.fuente_datos;
    const region = await eventBody.region;
    const variacionAnual = await eventBody.variacion_anual;
    const variacionMensual = await eventBody.variacion_mensual;
    const observaciones = await eventBody.observaciones;
    createdAt = await currentDateTime();
    updatedAt = await currentDateTime();

    let bioetPrecio = new BioetanolPrecio(
      uuid,
      periodo,
      bioetCanAzucar,
      bioetMaiz,
      unidadMedida,
      fuenteDatos,
      region,
      variacionAnual,
      variacionMensual,
      observaciones,
      createdAt,
      updatedAt,
    );

    item = {
      uuid: await bioetPrecio.getUuid(),
      periodo: await bioetPrecio.getPeriodo(),
      bioetCanAzucar: await bioetPrecio.getBioetCanAzucar(),
      bioetMaiz: await bioetPrecio.getBioetMaiz(),
      unidadMedida: await bioetPrecio.getUnidadMedida(),
      fuenteDatos: await bioetPrecio.getFuenteDatos(),
      region: await bioetPrecio.getRegion(),
      variacionAnual: await bioetPrecio.getVariacionAnual(),
      variacionMensual: await bioetPrecio.getVariacionMensual(),
      observaciones: await bioetPrecio.getObservaciones(),
      createdAt: await bioetPrecio.getCreatedAt(),
      updatedAt: await bioetPrecio.getUpdatedAt(),
    };

    newBioetPrecio = await insertItem(BIOET_PRECIOS_TABLE_NAME, item);

    if (newBioetPrecio == null || !newBioetPrecio.length) {
      return await bodyResponse(
        INTERNAL_SERVER_ERROR_CODE,
        'An error has occurred, the object has not been inserted into the database',
      );
    }

    //-- end with dynamoDB operations  ---

    return await bodyResponse(OK_CODE, item);
  } catch (error) {
    msgResponse = 'ERROR in insert controller function for bioethanol-prices.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return await bodyResponse(INTERNAL_SERVER_ERROR_CODE, msgResponse);
  }
};
