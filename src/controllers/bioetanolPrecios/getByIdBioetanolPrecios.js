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
let id;
let item;
const {BIOET_PRECIOS_TABLE} = process.env.BIOET_PRECIOS_TABLE_NAME;

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
        
        if(!validatePathParam){
            return await bodyResponse(
                statusCode.BAD_REQUEST,
                "Bad request, check malformed id"
            );
        }
        //-- end with path parameters  ---

        //-- start with dynamodb operations  ---

        // params = {
        //     TableName: BIOET_PRECIOS_TABLE,
        //     Key: {
        //         'id': {
        //             'S': id
        //         }
        //     },
        // };

        // item = await getOneItem(params);

        //-- end with dynamodb operations  ---


        return await bodyResponse(
            statusCode.OK,
            item
        );

    } catch (error) {
        console.log(`Error in getByIdBioetanolPrecios lambda, caused by ${{error}}`);
        console.error(error.stack);
        return await bodyResponse(
            statusCode.INTERNAL_SERVER_ERROR,
            "An unexpected error has occurred. Try again"
        );
    }

}