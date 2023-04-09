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
 * @description get all items from the database
 * @param {String} tableName string type
 * @returns a list with all items from the db in json format
 */
const getAllItems = async (tableName) => {

    try {
        dynamo = await dynamoDBClient();

        metadata = await dynamo.send(
            new ScanCommand({
                TableName: tableName
            })
        );
        items = metadata.Items;

        return items;

    } catch (error) {
        console.log(`Error in getAllItems(), caused by ${{error}}`);
    }
}


module.exports = {
    getAllItems
}
