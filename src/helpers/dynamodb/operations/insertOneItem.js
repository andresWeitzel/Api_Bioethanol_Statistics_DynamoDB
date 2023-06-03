//External
const {
    PutItemCommand,
} = require("@aws-sdk/client-dynamodb");
//Helpers
const {
    dynamoDBClient
} = require("../config/dynamoDBClient");
//Const-vars 
let dynamo;
let metadata;
let requestId;


/**
 * @description insert one item into the database
* @param {String} tableName string type
 * @param {Object} item object json type
 * @returns a metadata with the information of the operation
 */
const insertOneItem = async (tableName,item) => {
    try {

        requestId=null;
        dynamo = await dynamoDBClient();

        metadata = await dynamo.send(new PutItemCommand({
            TableName: tableName,
            Item : item
        }));
        
        if(metadata!=null){
            requestId = metadata.$metadata.requestId;
        }

        return requestId;

    } catch (error) {
        console.log(`Error in insertOneItem(), caused by ${{error}}`);
        console.error(error.stack);
    }
}


module.exports = {
    insertOneItem
}