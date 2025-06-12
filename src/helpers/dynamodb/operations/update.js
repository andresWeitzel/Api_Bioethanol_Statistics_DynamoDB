//External
const { UpdateCommand } = require('@aws-sdk/lib-dynamodb');
// const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
//Helpers
const { dynamoDBClient } = require('../config/client');
//Const-vars
let dynamo;
let metadata;
let itemUpdated;
let msgResponse;
let msgLog;

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
    msgResponse = null;
    msgLog = null;

    // Filter out undefined values
    const filteredItem = Object.fromEntries(
      Object.entries(item).filter(([_, value]) => value !== undefined)
    );
    
    const itemKeys = Object.keys(filteredItem);

    dynamo = await dynamoDBClient();

    metadata = await dynamo.send(
      new UpdateCommand({
        TableName: tableName,
        Key: key,
        ReturnValues: 'ALL_NEW',
        UpdateExpression: `SET ${itemKeys
          .map((k, index) => `#field${index} = :value${index}`)
          .join(', ')}`,
        ExpressionAttributeNames: itemKeys.reduce(
          (accumulator, k, index) => ({
            ...accumulator,
            [`#field${index}`]: k,
          }),
          {},
        ),
        ExpressionAttributeValues: itemKeys.reduce(
          (accumulator, k, index) => ({
            ...accumulator,
            [`:value${index}`]: filteredItem[k],
          }),
          {},
        ),
      }),
    );

    if (metadata != null) {
      itemUpdated = metadata.Attributes;
    }

    return itemUpdated;
  } catch (error) {
    msgResponse = 'ERROR in updateOneItem() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return msgResponse;
  }
};

module.exports = {
  updateOneItem,
};
