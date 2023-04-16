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
    getAllItems
} = require("../../helpers/dynamodb/getAll");

//Const/Vars
const BIOET_PRECIOS_TABLE_NAME = process.env.BIOET_PRECIOS_TABLE_NAME;
let eventBody;
let eventHeaders;
let validateReqParams;
let validateAuth;
let obj;
let queryStrParams;
let pageSizeNro;
let pageNro;
let orderAt;
let items;

/**
 * @description Function to obtain all the objects of the bioethanol prices table
 * @param {Object} event Object type
 * @returns a body response with http code and message
 */
module.exports.handler = async (event) => {
    try {
        //Init
        obj = null;
        items=null;
        pageSizeNro = 5;
        orderAt = "asc";

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

        //-- start with pagination  ---
        queryStrParams = event.queryStringParameters;

        if (queryStrParams != null) {
            pageSizeNro = parseInt(await event.queryStringParameters.limit);
            orderAt = await event.queryStringParameters.orderAt;
        }
        //-- end with pagination  ---

        //-- start with dynamodb operations  ---

        items = await getAllItems(BIOET_PRECIOS_TABLE_NAME, pageSizeNro, orderAt);

        if (items==null) {
            return await bodyResponse(
                statusCode.INTERNAL_SERVER_ERROR,
                "An error has occurred, failed to list database objects"
            );
        }
        //-- end with dynamodb operations  ---

        return await bodyResponse(
            statusCode.OK,
            items
        );

    } catch (error) {
        console.log(`Error in getAllBioetanolPrecios lambda, caused by ${{error}}`);
        console.error(error.stack);
        return await bodyResponse(
            statusCode.INTERNAL_SERVER_ERROR,
            "An unexpected error has occurred. Try again"
        );
    }

}