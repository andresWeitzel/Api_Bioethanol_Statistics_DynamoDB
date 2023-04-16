// //External
// // const {
// //     get
// // } = require("@aws-sdk/lib-dynamodb");
// //Helpers
// const {
//     GetItemCommand
// } = require("@aws-sdk/client-dynamodb");
// const {
//     dynamoDBClient
// } = require("./dynamoDBClient");
// //Const-vars 
// let dynamo;
// let item;


// /**
//  * @description get one items from the database according the id
//   * @param {Object} params object json type
//  * @returns a list with one item from the db in json format
//  */
// const getOneItem = async (params) => {

//     try {

//         dynamo = await dynamoDBClient();

//         item = await dynamo.send(new GetItemCommand({
//             TableName: params.tableName,
//             Key: params.Key
//         }));
//         console.log({ITEM: item})

//         return item;

//     } catch (error) {
//         console.log(`Error in getOneItem(), caused by ${{error}}`);
//         console.error(error.stack);
//     }
// }


// module.exports = {
//     getOneItem
// }