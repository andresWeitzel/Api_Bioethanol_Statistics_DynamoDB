//External
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
//Helpers
const {
    dynamoDBClient
} = require("../config/client");
//Const-vars 
let dynamo;
let metadata;
let requestId;
let msgResponse;
let msgLog;


/**
 * @description insert item/s into the database
* @param {String} tableName string type
 * @param {Object} item object json type
 * @returns a metadata with the information of the operation
 */
const insertItem = async (tableName,item) => {
    try {
        msgResponse = null;
        msgLog = null;
        requestId=null;
        dynamo = await dynamoDBClient();

        metadata = await dynamo.send(new PutCommand({
            TableName: tableName,
            Item : item
        }));
        
        if(metadata!=null){
            requestId = metadata.$metadata.requestId;
        }

        return requestId;

    } catch (error) {
        
        msgResponse = 'ERROR in insertItem() function.';
        msgLog = msgResponse + `Caused by ${error}`;
        console.log(msgLog);
        return msgResponse;
    }
}


module.exports = {
    insertItem
}