//External
const {
    UpdateCommand
} = require("@aws-sdk/lib-dynamodb");
// const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
//Helpers
const {
    dynamoDBClient
} = require("../config/client");
//Const-vars 
let dynamo;
let metadata;
let itemUpdated;


/**
 * @description update one item into the database
 * @param {String} tableName string type
 * @param {String} key string type
 * @param {Object} item object json type
 * @returns a metadata with the information of the operation
 */
const updateOneItem = async (tableName, key, item) => {
    try {
        itemUpdated = null;
        const itemKeys = Object.keys(item);

        dynamo = await dynamoDBClient();

        metadata = await dynamo.send(new UpdateCommand({
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

        if (metadata != null) {
            itemUpdated = metadata.Attributes;
        }

        return itemUpdated;

    } catch (error) {
        console.error(`ERROR in updateOneItem() function. Caused by ${error} . Specific stack is ${error.stack} `);
    }
}


module.exports = {
    updateOneItem
}