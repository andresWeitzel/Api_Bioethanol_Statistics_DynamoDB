//Models
const {
    BioetanolPrecio
} = require("../../models/BioetanolPrecio");
//Enums
const {
    statusCode
} = require("../../enums/http/statusCode");
const {
    value
} = require("../../enums/general/values");
//Helpers
const {
    bodyResponse
} = require("../../helpers/http/bodyResponse");
const {
    validateHeadersAndKeys,
} = require("../../helpers/validations/headers/validateHeadersAndKeys");
const {
    insertItem
} = require("../../helpers/dynamodb/operations/insertDynamoDB");
const {
    generateUUID
} = require("../../helpers/math/generateUuid");
const {
    formatToJson
} = require("../../helpers/format/formatToJson");
const {
    formatToString
} = require("../../helpers/format/formatToString");
const {
    validateBodyAddItemParams
} = require("../../helpers/validations/validator/http/requestBodyAddItemParams");
const {
    currentDateTime
} = require("../../helpers/dateTime/dates");

//Const/Vars
let eventHeaders;
let eventBody;
let validateReqParams;
let validateAuth;
let validateBodyAddItem;
let checkEventHeadersAndKeys;
let obj;
let item;
let newBioetPrecio;
let uuid;
let periodo;
let bioetCanAzucar;
let bioetMaiz;
let createdAt;
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

        validateBodyAddItem = await validateBodyAddItemParams(eventBody);

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

        let bioetPrecio = new BioetanolPrecio(uuid, periodo, bioetCanAzucar, bioetMaiz, createdAt);

        item = {
            id : await bioetPrecio.getUuid(),
            periodo : await bioetPrecio.getPeriodo(),
            bioetCanAzucar : await bioetPrecio.getBioetCanAzucar(),
            bioetMaiz : await bioetPrecio.getBioetMaiz(),
            createdAt : await bioetPrecio.getCreatedAt()
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
        msg = `Error in INSERT lambda. Caused by ${error}`;
        console.error(`${msg}. Stack error type : ${error.stack}`);

        return await bodyResponse(code, msg);
    }

}