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
const {
    validatePathParameters
} = require("../../helpers/http/queryStringParams");
const {
    getOneItem
} = require("../../helpers/dynamodb/getOne");
const {
    updateOneItem
} = require("../../helpers/dynamodb/updateOneItem");



//Const/Vars
let eventHeaders;
let eventBody;
let validateReqParams;
let validateAuth;
let validateBodyAddItem;
let validatePathParam;
let item;
let newBioetPrecio;
let uuid;
let periodo;
let bioetCanAzucar;
let bioetMaiz;
let bioetPrecio
let createdAt;
const BIOET_PRECIOS_TABLE_NAME = process.env.BIOET_PRECIOS_TABLE_NAME;

/**
 * @description Function to update one object into the bioethanol prices table
 * @param {Object} event Object type
 * @returns a body response with http code and message
 */
module.exports.handler = async (event) => {
    try {
        //Init
        item = null;
        bioetPrecio = null;

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
        uuid = await event.pathParameters.id;

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

        validateBodyAddItem = await validateBodyAddItemParams(eventBody);

        if (!validateBodyAddItem) {
            return await bodyResponse(
                statusCode.BAD_REQUEST,
                "Bad request, check request body attributes. Missing or incorrect"
            );
        }
        //-- end with body validations  ---


        //-- start with dynamoDB operations  ---


        // key = {
        //     'id': {
        //         'S': await uuid
        //     }
        // };

        // item = await getOneItem(BIOET_PRECIOS_TABLE_NAME, key);

        // if (item == null || !(item.length)) {
        //     return await bodyResponse(
        //         statusCode.BAD_REQUEST,
        //         `The object has not been updated with the id ${uuid} beacuse is not found in the database`
        //     );
        // }

        periodo = await eventBody.periodo;
        bioetCanAzucar = await eventBody.bioetanol_azucar;
        bioetMaiz = await eventBody.bioetanol_maiz;
        createdAt = await currentDateTime();

        bioetPrecio = new BioetanolPrecio(uuid, periodo, bioetCanAzucar, bioetMaiz, createdAt);

        key = {
            'id': {
                'S': await uuid
            }
        };

        item = {
            // 'id': {
            //     'S': await bioetPrecio.getUuid()
            // },
            'periodo': {
                'S': await bioetPrecio.getPeriodo()
            },
            'bioetCanAzucar': {
                'S': await bioetPrecio.getBioetCanAzucar()
            },
            'bioetMaiz': {
                'S': await bioetPrecio.getBioetMaiz()
            },
            'createdAt': {
                'S': await bioetPrecio.getCreatedAt()
            }
        };

        newBioetPrecio = await updateOneItem(BIOET_PRECIOS_TABLE_NAME, key, item);

        if (newBioetPrecio == null || !(newBioetPrecio.length)) {
            return await bodyResponse(
                statusCode.INTERNAL_SERVER_ERROR,
                "An error has occurred, the object has not been updated into the database"
            );
        }

        //-- end with dynamoDB operations  ---

        return await bodyResponse(
            statusCode.OK,
            bioetPrecio.toString()
        );

    } catch (error) {
        console.log(`Error in updated lambda, caused by ${{error}}`);
        console.error(error.stack);
        return await bodyResponse(
            statusCode.INTERNAL_SERVER_ERROR,
            "An unexpected error has occurred. Try again"
        );
    }

}