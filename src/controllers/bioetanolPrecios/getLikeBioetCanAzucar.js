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
    getAllItemsWithFilter
} = require("../../helpers/dynamodb/getAllWithFilter");

//Const/Vars
let eventBody;
let eventHeaders;
let validateReqParams;
let validateAuth;
let validatePathParam;
let key;
let id;
let pageNro;
let orderAt;
let items;
let bioetCanAzucar;
const BIOET_PRECIOS_TABLE_NAME = process.env.BIOET_PRECIOS_TABLE_NAME;

/**
 * @description Function to obtain all the objects of the bioethanol prices table according to the bioethanol caña azucar prices
 * @param {Object} event Object type
 * @returns a body response with http code and message
 */
module.exports.handler = async (event) => {
    try {
        //Init
        obj = null;
        id = '';
        items = null;
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

        //-- start with path parameters  ---
        bioetCanAzucar = await event.pathParameters.bioetCanAzucar;

        validatePathParam = await validatePathParameters(bioetCanAzucar);

        if (!validatePathParam) {
            return await bodyResponse(
                statusCode.BAD_REQUEST,
                "Bad request, check malformed bioetCanAzucar value"
            );
        }
        //-- end with path parameters  ---


        //-- start with dynamodb operations  ---

        items = await getAllItemsWithFilter(BIOET_PRECIOS_TABLE_NAME, 'bioetCanAzucar', bioetCanAzucar, pageSizeNro, orderAt);

        if (items == null || !(items.length)) {
            return await bodyResponse(
                statusCode.BAD_REQUEST,
                "The objects with the bioetCanAzucar value is not found in the database"
            );
        }
        //-- end with dynamodb operations  ---


        return await bodyResponse(
            statusCode.OK,
            items
        );

    } catch (error) {
        console.log(`Error in getLikeBioetCanAzucar lambda, caused by ${{error}}`);
        console.error(error.stack);
        return await bodyResponse(
            statusCode.INTERNAL_SERVER_ERROR,
            "An unexpected error has occurred. Try again"
        );
    }

}