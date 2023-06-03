//External
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
//Helpers
const {
    dynamoDBClient
} = require("../config/dynamoDBClient");
//Const-vars 
let dynamo;
let metadata;
let requestId;


/**
 * @description insert item/s into the database
* @param {String} tableName string type
 * @param {Object} item object json type
 * @returns a metadata with the information of the operation
 */
const insertItem = async (tableName,item) => {
    try {

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
        console.log(`Error in insertItem(), caused by ${{error}}`);
        console.error(error.stack);
    }
}


module.exports = {
    insertItem
}