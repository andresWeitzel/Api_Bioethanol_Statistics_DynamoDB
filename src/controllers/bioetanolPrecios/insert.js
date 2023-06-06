//Models
const {
    BioetanolPrecio
} = require("../../models/BioetanolPrecio");
//Enums
const {
    statusCode
} = require("../../enums/http/statusCode");
//Helpers
const {
    bodyResponse
} = require("../../helpers/http/bodyResponse");
const {
    validateHeadersParams,
} = require("../../helpers/validator/http/requestHeadersParams");
const {
    validateAuthHeaders
} = require("../../helpers/auth/headers");
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
} = require("../../helpers/validator/http/requestBodyAddItemParams");
const {
    currentDateTime
} = require("../../helpers/dateTime/dates");



//Const/Vars
let eventHeaders;
let eventBody;
let validateReqParams;
let validateAuth;
let validateBodyAddItem;
let obj;
let item;
let newBioetPrecio;
let uuid;
let periodo;
let bioetCanAzucar;
let bioetMaiz;
let createdAt;
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

        //-- start with validation Headers  ---
        eventHeaders = await event.headers;

        validateReqParams = await validateHeadersParams(eventHeaders);

        if (!validateReqParams) {
            return await bodyResponse(
                statusCode.BAD_REQUEST,
                "Bad request, check missing or malformed headers"
            );
        }

        validateAuth = await validateAuthHeaders(eventHeaders);

        if (!validateAuth) {
            return await bodyResponse(
                statusCode.UNAUTHORIZED,
                "Not authenticated, check x_api_key and Authorization"
            );
        }
        //-- end with validation Headers  ---

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
        console.log(`Error in insert lambda, caused by ${{error}}`);
        console.error(error.stack);
        return await bodyResponse(
            statusCode.INTERNAL_SERVER_ERROR,
            "An unexpected error has occurred. Try again"
        );
    }

}