//External
const { DeleteCommand } = require('@aws-sdk/lib-dynamodb');
//Helpers
const { dynamoDBClient } = require('../config/client');
//Const-vars
/**
 * @description undefined if the object has been deleted, defined if the object does not exist according to the key
 */
let consumedCapacity;
let dynamo;
let metadata;
let checkItemDeleted;
let msgResponse;
let msgLog;

/**
 * @description Delete one item object from the database based on their specified table and limit
 * @param {String} tableName String type
 * @param {String} uuid String type
 * @returns a boolean according to the information of the operation
 */
const deleteItemByUuid = async (tableName, uuid) => {
  try {
    //Init
    metadata = null;
    checkItemDeleted = false;
    consumedCapacity = null;
    msgResponse = null;
    msgLog = null;

    dynamo = await dynamoDBClient();

    metadata = await dynamo.send(
      new DeleteCommand({
        TableName: tableName,
        Key: {
          uuid: uuid,
        },
      }),
    );

    consumedCapacity = metadata.ConsumedCapacity;

    checkItemDeleted = consumedCapacity == undefined ? true : false;

    return checkItemDeleted;
  } catch (error) {
    msgResponse = 'ERROR in deleteItemByUuid() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return msgResponse;
  }
};

module.exports = {
  deleteItemByUuid,
};
