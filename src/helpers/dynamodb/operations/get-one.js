//External
const {
    GetCommand
} = require("@aws-sdk/lib-dynamodb");
//Helpers
const {
    dynamoDBClient
} = require("../config/client");
//Const-vars 
let dynamo;
let item;
let metadata;
let msgResponse;
let msgLog;


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
        msgResponse = null;
        msgLog = null;

        dynamo = await dynamoDBClient();

        metadata = await dynamo.send(new GetCommand({
            TableName: tableName,
            Key: key
        }));
        
        if(metadata != null){
            item = metadata.Item;
        }

        return item;
        
    } catch (error) {

        msgResponse = 'ERROR in getOneItem() function.';
        msgLog = msgResponse + `Caused by ${error}`;
        console.log(msgLog);
        return msgResponse;
    }
}


module.exports = {
    getOneItem
}