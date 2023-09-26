//Models
const {
    BioetanolPrecio
} = require("../../models/BioetanolPrecio");
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
    validateBodyAddItemParamsBioetPrecios
} = require("../../helpers/validations/validator/http/request-body-add-item-params");
const {
    currentDateTime
} = require("../../helpers/date-time/dates");

//Const/Vars
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
let msg;
let code;
const BIOET_PRECIOS_TABLE_NAME = process.env.BIOET_PRECIOS_TABLE_NAME;


/**
 * @description Function to insert one object into th bioethanol prices table
 * @param {Object} event Object type
 * @returns a body response with http code and message
 */
module.exports.handler = async (event) => {
    try {
        //Init

        //-- start with validation headers and keys  ---
        eventHeaders = await event.headers;

        checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

        if (checkEventHeadersAndKeys != value.IS_NULL) {
            return checkEventHeadersAndKeys;
        }
        //-- end with validation headers and keys  ---

        //-- start with body validations  ---

        eventBody = await formatToJson(event.body);

        validateBodyAddItem = await validateBodyAddItemParamsBioetPrecios(eventBody);

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
        bioetCanAzucar = await eventBody.bioetanol_azucar;
        bioetMaiz = await eventBody.bioetanol_maiz;
        createdAt = await currentDateTime();
        updatedAt = await currentDateTime();

        let bioetPrecio = new BioetanolPrecio(uuid, periodo, bioetCanAzucar, bioetMaiz, createdAt, updatedAt);

        item = {
            uuid : await bioetPrecio.getUuid(),
            periodo : await bioetPrecio.getPeriodo(),
            bioetCanAzucar : await bioetPrecio.getBioetCanAzucar(),
            bioetMaiz : await bioetPrecio.getBioetMaiz(),
            createdAt : await bioetPrecio.getCreatedAt(),
            updatedAt : await bioetPrecio.getUpdatedAt()
            }

        newBioetPrecio = await insertItem(BIOET_PRECIOS_TABLE_NAME, item);

        if (newBioetPrecio == null || !(newBioetPrecio.length)) {
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
        msg = `Error in insert bioetanol-precios lambda. Caused by ${error}`;
        console.error(`${msg}. Stack error type : ${error.stack}`);

        return await bodyResponse(code, msg);
    }

}