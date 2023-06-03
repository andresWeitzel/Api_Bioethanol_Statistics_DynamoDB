//External
const {
    GetItemCommand
} = require("@aws-sdk/client-dynamodb");
//Helpers
const {
    dynamoDBClient
} = require("../config/dynamoDBClient");
//Const-vars 
let dynamo;
let item;
let metadata;


/**
 * @description get one items from the database according the id
 * @param {String} tableName string type
 * @param {Object} key object json type
 * @returns a list with one item from the db in json format
 */
const getOneItem = async (tableName, key) => {

    try {
        item = null;
        metadata=null;


        dynamo = await dynamoDBClient();

        metadata = await dynamo.send(new GetItemCommand({
            TableName: tableName,
            Key: key
        }));
        
        if(metadata != null){
            item = metadata.Item;
        }

        return item;

    } catch (error) {
        console.error(`ERROR in getOneItem() function. Caused by ${error} . Specific stack is ${error.stack} `);
    }
}


module.exports = {
    getOneItem
}