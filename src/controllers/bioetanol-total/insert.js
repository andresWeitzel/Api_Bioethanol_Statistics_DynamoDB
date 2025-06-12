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
let capacidadInstalada;
let eficienciaProduccion;
let ubicacion;
let estadoOperativo;
let observaciones;
let createdAt;
let updatedAt;
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

    //-- start with dynamoDB operations  ---

    uuid = await generateUUID();
    uuid = await formatToString(uuid);
    periodo = eventBody.periodo;
    produccion = eventBody.produccion;
    ventasTotales = eventBody.ventas_totales;
    capacidadInstalada = eventBody.capacidad_instalada;
    eficienciaProduccion = eventBody.eficiencia_produccion;
    ubicacion = eventBody.ubicacion;
    estadoOperativo = eventBody.estado_operativo;
    observaciones = eventBody.observaciones;
    createdAt = await currentDateTime();
    updatedAt = await currentDateTime();

    newBioetTotal = new BioetanolTotal(
      uuid,
      periodo,
      produccion,
      ventasTotales,
      capacidadInstalada,
      eficienciaProduccion,
      ubicacion,
      estadoOperativo,
      observaciones,
      createdAt,
      updatedAt
    );

    item = {
      uuid: newBioetTotal.getUuid(),
      periodo: newBioetTotal.getPeriodo(),
      produccion: newBioetTotal.getProduccion(),
      ventasTotales: newBioetTotal.getVentasTotales(),
      capacidadInstalada: newBioetTotal.getCapacidadInstalada(),
      eficienciaProduccion: newBioetTotal.getEficienciaProduccion(),
      ubicacion: newBioetTotal.getUbicacion(),
      estadoOperativo: newBioetTotal.getEstadoOperativo(),
      observaciones: newBioetTotal.getObservaciones(),
      createdAt: newBioetTotal.getCreatedAt(),
      updatedAt: newBioetTotal.getUpdatedAt()
    };

    try {
      await insertItem(BIOET_TOTAL_TABLE_NAME, item);
    } catch (error) {
      msgResponse = 'ERROR in insert() function.';
      msgLog = msgResponse + `Caused by ${error}`;
      console.log(msgLog);

      return await bodyResponse(
        INTERNAL_SERVER_ERROR_CODE,
        'An error has occurred, failed to insert database object.'
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
