//Models
const { BioetanolPrecio } = require("../../models/BioetanolPrecio");
//Enums
const { statusCode } = require("../../enums/http/status-code");
const { value } = require("../../enums/general/values");
//Helpers
const { bodyResponse } = require("../../helpers/http/body-response");
const {
  validateHeadersAndKeys,
} = require("../../helpers/validations/headers/validate-headers-keys");
const { formatToJson } = require("../../helpers/format/format-to-json");
const { formatToString } = require("../../helpers/format/format-to-string");
const {
  validateBodyAddItemParamsBioetPrecios,
} = require("../../helpers/validations/validator/http/request-body-add-item-params");
const { currentDateTime } = require("../../helpers/date-time/dates");
const {
  validatePathParameters,
} = require("../../helpers/http/query-string-params");
const { getOneItem } = require("../../helpers/dynamodb/operations/get-one");
const { updateOneItem } = require("../../helpers/dynamodb/operations/update");

//Const-Vars
const BIOET_PRECIOS_TABLE_NAME = process.env.BIOET_PRECIOS_TABLE_NAME || '';
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
    eventHeaders = event.headers;

    checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

    if (checkEventHeadersAndKeys != value.IS_NULL) {
      return checkEventHeadersAndKeys;
    }
    //-- end with validation headers and keys  ---

    //-- start with path parameters  ---
    uuid = await formatToString(event.pathParameters.uuid);

    validatePathParam = await validatePathParameters(uuid);

    if (!validatePathParam) {
      return await bodyResponse(
        statusCode.BAD_REQUEST,
        "Bad request, check malformed uuid"
      );
    }
    //-- end with path parameters  ---

    //-- start with body validations  ---

    eventBody = await formatToJson(event.body);

    validateBodyAddItem = await validateBodyAddItemParamsBioetPrecios(
      eventBody
    );

    if (!validateBodyAddItem) {
      return await bodyResponse(
        statusCode.BAD_REQUEST,
        "Bad request, check request body attributes. Missing or incorrect"
      );
    }
    //-- end with body validations  ---

    //-- start with old item dynamoDB operations  ---

    key = { uuid: uuid };

    oldItem = await getOneItem(BIOET_PRECIOS_TABLE_NAME, key);

    if (oldItem == value.IS_NULL || oldItem == value.IS_UNDEFINED) {
      return await bodyResponse(
        statusCode.INTERNAL_SERVER_ERROR,
        `Internal Server Error. Unable to update object in db as failed to get a item by uuid ${uuid} . Check if the item exists in the database and try again.`
      );
    }
    //-- end with old item dynamoDB operations  ---

    //-- start with new item dynamoDB operations  ---

    newBioetanolPrecioObj = new BioetanolPrecio(
      uuid,
      eventBody.periodo,
      eventBody.bioetanol_azucar,
      eventBody.bioetanol_maiz,
      await currentDateTime(),
      await currentDateTime()
    );

    newItem = {
      periodo: newBioetanolPrecioObj.getPeriodo(),
      bioetCanAzucar: newBioetanolPrecioObj.getBioetCanAzucar(),
      bioetMaiz: newBioetanolPrecioObj.getBioetMaiz(),
      updatedAt: newBioetanolPrecioObj.getUpdatedAt(),
    };

    updatedBioetPrecio = await updateOneItem(
      BIOET_PRECIOS_TABLE_NAME,
      key,
      newItem
    );

    if (
      updatedBioetPrecio == value.IS_NULL ||
      updatedBioetPrecio == value.IS_UNDEFINED
    ) {
      return await bodyResponse(
        statusCode.INTERNAL_SERVER_ERROR,
        "An error has occurred, the object has not been updated into the database"
      );
    }

    //-- end with new item dynamoDB operations  ---

    return await bodyResponse(statusCode.OK, updatedBioetPrecio);
  } catch (error) {
    msgResponse = "ERROR in update controller function for bioethanol-prices.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return await bodyResponse(statusCode.INTERNAL_SERVER_ERROR, msgResponse);
  }
};
