//External
const {
    DynamoDBDocumentClient
} = require("@aws-sdk/lib-dynamodb");
const {
    DynamoDBClient
} = require("@aws-sdk/client-dynamodb");
//Const-vars 
let client;
let dynamo;


/**
 * @description creating a dynamodb client
 * @returns the client created
 */
const dynamoDBClient = async () => {
    try {
         client = new DynamoDBClient({
            region: process.env.REGION,
            accessKeyId: process.env.ACCESS_KEY_RANDOM_VALUE,
            secretAccessKey: process.env.SECRET_KEY_RANDOM_VALUE,
            endpoint: process.env.ENDPOINT
        });

        dynamo = DynamoDBDocumentClient.from(client);

        return dynamo;

    } catch (error) {
        console.log(`Error in dynamoDBClient(), caused by ${{error}}`);
        console.error(error.stack);
    }
}

module.exports = {
    dynamoDBClient
}
