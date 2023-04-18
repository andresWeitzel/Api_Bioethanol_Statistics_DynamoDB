//External
const {
    ScanCommand
} = require("@aws-sdk/lib-dynamodb");
//Helpers
const {
    dynamoDBClient
} = require("./dynamoDBClient");
//Const-vars 
let dynamo;
let metadata;
let items;


/**
 * @description get all items from the database according to the filter applied
 * @param {String} tableName string type
 * @param {String} filter String type
 * @param {BigInt} limit BigInt type
 * @param {String} orderAt String type
 * @returns a list with all items from the db in json format
 */
const getAllItemsWithFilter = async (tableName, filter, filterValue,pageSizeNro, orderAt) => {
    try {
        items = null;
        orderAt = orderAt.toLowerCase();

        if (orderAt == 'asc' || orderAt == null) {
            orderAt = true;
        } else {
            orderAt = false;
        }

        dynamo = await dynamoDBClient();

        metadata = await dynamo.send(
            new ScanCommand({
                TableName: tableName,
                FilterExpression: 'contains(#filter, :filterValue)',
                ExpressionAttributeNames:{
                    "#filter":filter
                },
                ExpressionAttributeValues: {
                    ':filterValue': filterValue
                },
                Limit: pageSizeNro,
                ScanIndexForward: orderAt
            })
        );

        console.log(metadata)

        if (metadata != null) {
            items = metadata.Items;
        }

        return items;

    } catch (error) {
        console.log(`Error in getAllItemsWithFilter(), caused by ${{error}}`);
        console.error(error.stack);
    }
}


module.exports = {
    getAllItemsWithFilter
}