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
    insertOneItem
} = require("../../helpers/dynamodb/insertOneItem");
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



//Const/Vars
let eventHeaders;
let eventBody;
let validateReqParams;
let validateAuth;
let validateBodyAddItem;
let obj;
let params;
const {BIOET_PRECIOS_TABLE} = process.env.BIOET_PRECIOS_TABLE_NAME;

/**
 * @description Function to obtain all the objects of the bioethanol prices table
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

        let uuid=await(generateUUID());
        uuid=await formatToString(uuid);
        let periodo=await eventBody.periodo;
        let bioetCanAzucar=await eventBody.bioetanol_azucar;
        let bioetMaiz=await eventBody.bioetanol_maiz;

        params = {
            TableName: 'bioetanol-precios',
            Item: {
                'id': {
                    'S': uuid
                },
                'periodo': {
                    'S': periodo
                },
                'bioetCanAzucar': {
                    'S': bioetCanAzucar
                },
                'bioetMaiz': {
                    'S': bioetMaiz
                }
            },
        };

        let requestId = await insertOneItem(params);

        //-- end with dynamoDB operations  ---

        return await bodyResponse(
            statusCode.OK,
            requestId
        );

    } catch (error) {
        console.log(error);
        return await bodyResponse(
            statusCode.INTERNAL_SERVER_ERROR,
            "An unexpected error has occurred. Try again"
        );
    }

}