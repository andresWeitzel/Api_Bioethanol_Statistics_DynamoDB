//External
const { DeleteCommand } = require("@aws-sdk/lib-dynamodb");
//Helpers
const {
  dynamoDBClient
} = require("../config/client");
//Const-vars
let dynamo;
let metadata;
let checkItemDeleted;
/**
 * @description undefined if the object has been deleted, defined if the object does not exist according to the key
 */
let consumedCapacity;

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

    dynamo = await dynamoDBClient();

    metadata = await dynamo.send(
      new DeleteCommand({
        TableName: tableName,
        Key: {
          uuid: uuid,
        },
      })
    );

    consumedCapacity = metadata.ConsumedCapacity;

    if (consumedCapacity == undefined) {
      checkItemDeleted = true;
    }

    return checkItemDeleted;
  } catch (error) {
    console.error(
      `Error with deleteItemByUuid(), caused by.. ${error} . Specific stack error is ${error.stack}`
    );
  }
};

module.exports={
  deleteItemByUuid
}