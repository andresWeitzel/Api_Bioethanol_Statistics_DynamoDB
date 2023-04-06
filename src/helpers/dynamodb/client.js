// // External
// import {
//     DynamoDBClient
// } from "@aws-sdk/client-dynamodb";

// //Environment vars
// import {
//     DEFAULT_REGION
// } from process.env.DEFAULT_REGION;

// //Const-vars 
// let client;


// /**
//  * @description creating a dynamodb client
//  * @returns the client created
//  */
// const dynamoDBClient = async () => {
//     try {
//         client = new DynamoDBClient({
//             region: DEFAULT_REGION
//         });
//         return client;
//     } catch (error) {
//         console.log(`Error in dynamoDBClient(), caused by ${{error}}`);
//     }
// }

// module.exports = {
//     dynamoDBClient
// }