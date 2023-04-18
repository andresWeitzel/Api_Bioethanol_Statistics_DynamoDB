//External
const {
    PutItemCommand
} = require("@aws-sdk/client-dynamodb");
//Helpers
const {
    dynamoDBClient
} = require("./dynamoDBClient");
//Const-vars 
let dynamo;
let metadata;
let requestId;


/**
 * @description insert one item in the database
* @param {String} tableName string type
 * @param {Object} items object json type
 * @returns a metadata with the information of the operation
 */
const insertOneItem = async (tableName,items) => {
    try {

        requestId=null;
        dynamo = await dynamoDBClient();

        metadata = await dynamo.send(new PutItemCommand({
            TableName: tableName,
            Item : items
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