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
    validatePathParameters,
} = require("../../helpers/http/queryStringParams");
const {
    getOneItem
} = require("../../helpers/dynamodb/getOne");

//Const/Vars
let eventBody;
let eventHeaders;
let validateReqParams;
let validateAuth;
let validatePathParam;
let key;
let id;
let item;
const BIOET_PRECIOS_TABLE_NAME = process.env.BIOET_PRECIOS_TABLE_NAME;

/**
 * @description Function to obtain all the objects of the bioethanol prices table according to id
 * @param {Object} event Object type
 * @returns a body response with http code and message
 */
module.exports.handler = async (event) => {
    try {
        //Init
        obj = null;
        id = '';
        item = null;
        key = null;

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

        //-- start with path parameters  ---
        id = await event.pathParameters.id;

        validatePathParam = await validatePathParameters(id);

        if (!validatePathParam) {
            return await bodyResponse(
                statusCode.BAD_REQUEST,
                "Bad request, check malformed id"
            );
        }
        //-- end with path parameters  ---

        //-- start with dynamodb operations  ---

        key = {
            'id': {
                'S': await id
            }
        };

        item = await getOneItem(BIOET_PRECIOS_TABLE_NAME, key);
        
        if (item==null || !(item.length)) {
            return await bodyResponse(
                statusCode.BAD_REQUEST,
                "The object with the requested id is not found in the database"
            );
        }
        //-- end with dynamodb operations  ---


        return await bodyResponse(
            statusCode.OK,
            item
        );

    } catch (error) {
        console.log(`Error in getById lambda, caused by ${{error}}`);
        console.error(error.stack);
        return await bodyResponse(
            statusCode.INTERNAL_SERVER_ERROR,
            "An unexpected error has occurred. Try again"
        );
    }

}