//External
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
//Const
const DYNAMO_DB_CLIENT_ERROR = 'ERROR in dynamoDBClient helper function.';
//Vars
let client;
let dynamo;
let msgResponse;
let msgLog;

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
      endpoint: process.env.ENDPOINT,
    });

    dynamo = DynamoDBDocumentClient.from(client);

    return dynamo;
  } catch (error) {
    msgResponse = DYNAMO_DB_CLIENT_ERROR;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return msgResponse;
  }
};

module.exports = {
  dynamoDBClient,
};
