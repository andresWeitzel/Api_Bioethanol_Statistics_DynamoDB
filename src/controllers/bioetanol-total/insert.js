//Models
const {
    BioetanolTotal
} = require("../../models/BioetanolTotal");
//Enums
const {
    statusCode
} = require("../../enums/http/status-code");
const {
    value
} = require("../../enums/general/values");
//Helpers
const {
    bodyResponse
} = require("../../helpers/http/body-response");
const {
    validateHeadersAndKeys,
} = require("../../helpers/validations/headers/validate-headers-keys");
const {
    insertItem
} = require("../../helpers/dynamodb/operations/insert");
const {
    generateUUID
} = require("../../helpers/math/generate-uuid");
const {
    formatToJson
} = require("../../helpers/format/format-to-json");
const {
    formatToString
} = require("../../helpers/format/format-to-string");
const {
    validateBodyAddItemParamsBioetTotal
} = require("../../helpers/validations/validator/http/request-body-add-item-params");
const {
    currentDateTime
} = require("../../helpers/date-time/dates");

//Const/Vars
let eventHeaders;
let eventBody;
let validateBodyAddItem;
let checkEventHeadersAndKeys;
let obj;
let item;
let newBioetTotal;
let uuid;
let periodo;
let produccion;
let ventasTotales;
let createdAt;
let msg;
let code;
const BIOET_TOTAL_TABLE_NAME = process.env.BIOET_TOTAL_TABLE_NAME;


/**
 * @description Function to insert one object into th bioethanol total table
 * @param {Object} event Object type
 * @returns a body response with http code and message
 */
module.exports.handler = async (event) => {
    try {
        //Init
        obj = null;

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
                "Bad request, check request body attributes. Missing or incorrect"
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

        let bioetPrecio = new BioetanolTotal(uuid, periodo, produccion, ventasTotales, createdAt);

        item = {
            id : await bioetPrecio.getUuid(),
            periodo : await bioetPrecio.getPeriodo(),
            produccion : await bioetPrecio.getProduccion(),
            ventasTotales : await bioetPrecio.getVentasTotales(),
            createdAt : await bioetPrecio.getCreatedAt()
            }

        newBioetTotal = await insertItem(BIOET_TOTAL_TABLE_NAME, item);

        if (newBioetTotal == null || !(newBioetTotal.length)) {
            return await bodyResponse(
                statusCode.INTERNAL_SERVER_ERROR,
                "An error has occurred, the object has not been inserted into the database"
            );
        }

        //-- end with dynamoDB operations  ---

        return await bodyResponse(
            statusCode.OK,
            item
        );

    } catch (error) {
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `Error in INSERT lambda. Caused by ${error}`;
        console.error(`${msg}. Stack error type : ${error.stack}`);

        return await bodyResponse(code, msg);
    }

}