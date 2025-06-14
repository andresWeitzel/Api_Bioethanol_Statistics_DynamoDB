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

    const validationResult = await validateBodyAddItemParamsBioetPrecios(eventBody);

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

    //-- start with dynamoDB operations  ---

    uuid = await generateUUID();
    uuid = await formatToString(uuid);
    periodo = await eventBody.periodo;
    bioetCanAzucar = await eventBody.bioetanol_azucar;
    bioetMaiz = await eventBody.bioetanol_maiz;
    unidadMedida = await eventBody.unidad_medida;
    fuenteDatos = await eventBody.fuente_datos;
    region = await eventBody.region;
    variacionAnual = await eventBody.variacion_anual;
    variacionMensual = await eventBody.variacion_mensual;
    observaciones = await eventBody.observaciones;
    createdAt = await currentDateTime();
    updatedAt = await currentDateTime();

    newBioetPrecio = new BioetanolPrecio(
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
      updatedAt
    );

    item = {
      uuid: newBioetPrecio.getUuid(),
      periodo: newBioetPrecio.getPeriodo(),
      bioetCanAzucar: newBioetPrecio.getBioetCanAzucar(),
      bioetMaiz: newBioetPrecio.getBioetMaiz(),
      unidadMedida: newBioetPrecio.getUnidadMedida(),
      fuenteDatos: newBioetPrecio.getFuenteDatos(),
      region: newBioetPrecio.getRegion(),
      variacionAnual: newBioetPrecio.getVariacionAnual(),
      variacionMensual: newBioetPrecio.getVariacionMensual(),
      observaciones: newBioetPrecio.getObservaciones(),
      createdAt: newBioetPrecio.getCreatedAt(),
      updatedAt: newBioetPrecio.getUpdatedAt()
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
