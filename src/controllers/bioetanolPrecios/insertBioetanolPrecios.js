//External
const {
    DynamoDBDocumentClient,
    PutCommand
} = require("@aws-sdk/lib-dynamodb");
const {
    DynamoDBClient,
} = require("@aws-sdk/client-dynamodb");
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
// const {
//     dynamoDBClient
// } = require("../../helpers/dynamodb/client");

//Environment vars
const DEFAULT_REGION = process.env.REGION;


//Const/Vars
let eventBody;
let eventHeaders;
let validateReqParams;
let validateAuth;
let obj;

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

        //-- start with dynamoDB operations  ---
        const params = {
            TableName: "bioetanolPrecios",
            Item: {
                id: {
                    S: "JAHSDJAH33DASDBA"
                },
                periodo: {
                    S: "2023/12/01"
                },
                // bioetCanAzucar: {
                //     S: "329,309"
                // },
                // bioetMaiz: {
                //     S: "351,00"
                // }
            },
        };
        try {
            const client = new DynamoDBClient({
                //region: DEFAULT_REGION,
                region: 'us-east-1',
                //endpoint: "http://localhost:8042",
                 accessKeyId: 'xxxx',
                 secretAccessKey: 'xxxx',
                // sessionToken: 'xxxx'
            });

            console.log(client);

            // const command = new UpdateItemCommand(params);

            // const result = await client.send(command);

            // console.log("Success - item added or updated", result);

            const dynamo = await DynamoDBDocumentClient.from(client);

            console.log(dynamo);

             const data = await dynamo.send(new PutCommand(
                {
                    TableName: "bioetanol-precios",
                    //Item:{}
                    Item: {
                        id: {
                            S: "JAHSDJAH33DASDBA"
                        },
                        periodo: {
                            S: "2023/12/01"
                        },
                    //     // bioetCanAzucar: {
                    //     //     S: "329,309"
                    //     // },
                    //     // bioetMaiz: {
                    //     //     S: "351,00"
                    //     // }
                    },
                }
             ));
             console.log("Success - item added or updated", data);
        } catch (err) {
            console.log("Error", err.stack);
        }

        //-- end with dynamoDB operations  ---
        return await bodyResponse(
            statusCode.OK,
            obj
        );

    } catch (error) {
        console.log(error);
        return await bodyResponse(
            statusCode.INTERNAL_SERVER_ERROR,
            "An unexpected error has occurred. Try again"
        );
    }

}