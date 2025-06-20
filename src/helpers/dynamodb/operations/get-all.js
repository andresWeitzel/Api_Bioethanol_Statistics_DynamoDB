//External
const { ScanCommand } = require('@aws-sdk/lib-dynamodb');
//Helpers
const { dynamoDBClient } = require('../config/client');
//Const-vars
let dynamo;
let metadata;
let items;
let msgResponse;
let msgLog;

/**
 * @description get all items from the database
 * @param {String} tableName string type
 * @param {BigInt} pageSizeNro BigInt type
 * @param {String} orderAt String type
 * @returns a list with all items from the db in json format
 */
const getAllItems = async (tableName, pageSizeNro, orderAt) => {
  try {
    orderAt = orderAt.toLowerCase();
    metadata = null;
    items = null;
    msgResponse = null;
    msgLog = null;

    if (orderAt == 'asc' || orderAt == null) {
      orderAt = true;
    } else {
      orderAt = false;
    }

    dynamo = await dynamoDBClient();

    metadata = await dynamo.send(
      new ScanCommand({
        TableName: tableName,
        Limit: pageSizeNro,
        ScanIndexForward: orderAt,
      }),
    );

    if (metadata != null) {
      items = metadata.Items;
    }

    return items;
  } catch (error) {
    msgResponse = 'ERROR in getAllItems() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return msgResponse;
  }
};

/**
 * @description get all items from the database according to the filter applied
 * @param {String} tableName string type
 * @param {String} filter string type
 * @param {String} filterValue string type
 * @param {BigInt} pageSizeNro BigInt type
 * @param {String} orderAt String type
 * @returns a list with all items from the db in json format
 */
const getAllItemsWithFilter = async (
  tableName,
  filter,
  filterValue,
  pageSizeNro,
  orderAt,
) => {
  try {
    metadata = null;
    items = null;
    msgResponse = null;
    msgLog = null;
    orderAt = orderAt.toLowerCase();


    if (orderAt == 'asc' || orderAt == null) {
      orderAt = true;
    } else {
      orderAt = false;
    }

    dynamo = await dynamoDBClient();

    // Exact match search
    const filterExpression = '#filter = :filterValue';
    const expressionAttributeValues = {
      ':filterValue': filterValue,
    };

    metadata = await dynamo.send(
      new ScanCommand({
        TableName: tableName,
        FilterExpression: filterExpression,
        ExpressionAttributeNames: {
          '#filter': filter,
        },
        ExpressionAttributeValues: expressionAttributeValues,
        Limit: pageSizeNro,
        ScanIndexForward: orderAt,
      }),
    );

    if (metadata != null) {
      items = metadata.Items;
    }

    return items;
  } catch (error) {
    msgResponse = 'ERROR in getAllItemsWithFilter() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return msgResponse;
  }
};

module.exports = {
  getAllItems,
  getAllItemsWithFilter,
};
