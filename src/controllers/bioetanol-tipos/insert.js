//Models
const { BioetanolTipo } = require('../../models/BioetanolTipo');
//Enums
const { statusCode } = require('../../enums/http/status-code');
const { value } = require('../../enums/general/values');
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

//Const/Vars
const BIOET_TIPO_TABLE_NAME = process.env.BIOET_TIPO_TABLE_NAME || '';
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
let createdAt;
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

    checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

    if (checkEventHeadersAndKeys != value.IS_NULL) {
      return checkEventHeadersAndKeys;
    }
    //-- end with validation headers and keys  ---

    //-- start with body validations  ---

    eventBody = await formatToJson(event.body);

    validateBodyAddItem = await validateBodyAddItemParamsBioetTotal(eventBody);

    if (!validateBodyAddItem) {
      return await bodyResponse(
        statusCode.BAD_REQUEST,
        'Bad request, check request body attributes. Missing or incorrect',
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
    createdAt = await currentDateTime();
    updatedAt = await currentDateTime();

    let bioetTipoObj = new BioetanolTipo(
      uuid,
      tipo,
      periodo,
      produccion,
      ventasTotales,
      createdAt,
      updatedAt,
    );

    item = {
      uuid: await bioetTipoObj.getUuid(),
      tipo: await bioetTipoObj.getTipo(),
      periodo: await bioetTipoObj.getPeriodo(),
      produccion: await bioetTipoObj.getProduccion(),
      ventasTotales: await bioetTipoObj.getVentasTotales(),
      createdAt: await bioetTipoObj.getCreatedAt(),
      updatedAt: await bioetTipoObj.getUpdatedAt(),
    };

    newBioetTipo = await insertItem(BIOET_TIPO_TABLE_NAME, item);

    if (newBioetTipo == null || !newBioetTipo.length) {
      return await bodyResponse(
        statusCode.INTERNAL_SERVER_ERROR,
        'An error has occurred, the object has not been inserted into the database',
      );
    }

    //-- end with dynamoDB operations  ---

    return await bodyResponse(statusCode.OK, item);
  } catch (error) {
    msgResponse = 'ERROR in insert controller function for bioethanol-tipo.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return await bodyResponse(statusCode.INTERNAL_SERVER_ERROR, msgResponse);
  }
};
