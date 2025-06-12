//Models
const { BioetanolTipo } = require('../../models/BioetanolTipo');
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
  validateBodyAddItemParamsBioetTipos,
} = require('../../helpers/validations/validator/http/request-body-add-item-params');
const { currentDateTime } = require('../../helpers/date-time/dates');
//Const
const BIOET_TIPO_TABLE_NAME = process.env.BIOET_TIPO_TABLE_NAME || '';
const OK_CODE = statusCode.OK;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
//Vars
let eventHeaders;
let eventBody;
let validateBodyAddItem;
let checkEventHeadersAndKeys;
let item;
let newBioetTipo;
let uuid;
let periodo;
let produccion;
let ventasTotales;
let capacidadInstalada;
let eficienciaProduccion;
let materiaPrima;
let ubicacion;
let estadoOperativo;
let observaciones;
let createdAt;
let updatedAt;
let msgResponse;
let msgLog;

/**
 * @description Function to insert one object into the bioethanol tipo table
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

    const validationResult = await validateBodyAddItemParamsBioetTipos(eventBody);

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
    tipo = await eventBody.tipo;
    periodo = await eventBody.periodo;
    produccion = await eventBody.produccion;
    ventasTotales = await eventBody.ventas_totales;
    capacidadInstalada = await eventBody.capacidad_instalada;
    eficienciaProduccion = await eventBody.eficiencia_produccion;
    materiaPrima = await eventBody.materia_prima;
    ubicacion = await eventBody.ubicacion;
    estadoOperativo = await eventBody.estado_operativo;
    observaciones = await eventBody.observaciones;
    createdAt = await currentDateTime();
    updatedAt = await currentDateTime();

    if (tipo != (null && undefined)) {
      tipo = tipo.toLowerCase();
      switch (tipo) {
        case 'can_azuc':
        case 'cana_azucar':
        case 'azucar':
        case 'base_azucar':
        case 'caña':
          tipo = 'caña_azucar';
          break;
        case 'maiz':
        case 'maíz':
        case 'base_maiz':
          tipo = 'maiz';
          break;
        default:
          tipo = null;
          break;
      }
    }

    if (tipo == null) {
      return await bodyResponse(
        BAD_REQUEST_CODE,
        'Bad request, tipo must be one of: caña_azucar, maiz',
      );
    }

    newBioetTipo = new BioetanolTipo(
      uuid,
      tipo,
      periodo,
      produccion,
      ventasTotales,
      capacidadInstalada,
      eficienciaProduccion,
      materiaPrima,
      ubicacion,
      estadoOperativo,
      observaciones,
      createdAt,
      updatedAt
    );

    item = {
      uuid: newBioetTipo.getUuid(),
      tipo: newBioetTipo.getTipo(),
      periodo: newBioetTipo.getPeriodo(),
      produccion: newBioetTipo.getProduccion(),
      ventasTotales: newBioetTipo.getVentasTotales(),
      capacidadInstalada: newBioetTipo.getCapacidadInstalada(),
      eficienciaProduccion: newBioetTipo.getEficienciaProduccion(),
      materiaPrima: newBioetTipo.getMateriaPrima(),
      ubicacion: newBioetTipo.getUbicacion(),
      estadoOperativo: newBioetTipo.getEstadoOperativo(),
      observaciones: newBioetTipo.getObservaciones(),
      createdAt: newBioetTipo.getCreatedAt(),
      updatedAt: newBioetTipo.getUpdatedAt()
    };

    newBioetTipo = await insertItem(BIOET_TIPO_TABLE_NAME, item);

    if (newBioetTipo == null || !newBioetTipo.length) {
      return await bodyResponse(
        INTERNAL_SERVER_ERROR_CODE,
        'An error has occurred, the object has not been inserted into the database',
      );
    }

    //-- end with dynamoDB operations  ---

    return await bodyResponse(OK_CODE, item);
  } catch (error) {
    msgResponse = 'ERROR in insert controller function for bioethanol-tipo.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return await bodyResponse(INTERNAL_SERVER_ERROR_CODE, msgResponse);
  }
};
