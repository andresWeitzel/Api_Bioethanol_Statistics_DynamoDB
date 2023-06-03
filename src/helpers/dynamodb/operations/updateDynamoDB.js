//External
const {
    UpdateItemCommand,
} = require("@aws-sdk/client-dynamodb");
// const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
//Helpers
const {
    dynamoDBClient
} = require("../config/dynamoDBClient");
//Const-vars 
let dynamo;
let metadata;
let requestId;


/**
 * @description update one item into the database
 * @param {String} tableName string type
 * @param {String} key string type
 * @param {Object} item object json type
 * @returns a metadata with the information of the operation
 */
const updateOneItem = async (tableName, key, item) => {
    try {
        requestId = null;
        const itemKeys = Object.keys(item);

        dynamo = await dynamoDBClient();

        metadata = await dynamo.send(new UpdateItemCommand({
            TableName: tableName,
            Key: key,
            ReturnValues: 'ALL_NEW',
            UpdateExpression: `SET ${itemKeys.map((k, index) => `#field${index} = :value${index}`).join(', ')}`,
            ExpressionAttributeNames: itemKeys.reduce((accumulator, k, index) => ({
                ...accumulator,
                [`#field${index}`]: k
            }), {}),
            ExpressionAttributeValues: itemKeys.reduce((accumulator, k, index) => ({
                ...accumulator,
                [`:value${index}`]: item[k]
            }), {}),
        }));

        // if (metadata != null) {
        //     requestId = metadata.$metadata.requestId;
        // }

        // return requestId;

        console.log({UPDATE : metadata});

        return metadata;

    } catch (error) {
        console.log(`Error in updateOneItem(), caused by ${{error}}`);
        console.error(error.stack);
    }
}


module.exports = {
    updateOneItem
}