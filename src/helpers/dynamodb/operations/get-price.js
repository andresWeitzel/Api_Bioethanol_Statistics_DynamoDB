//External
const { ScanCommand } = require('@aws-sdk/lib-dynamodb');
//Helpers
const { dynamoDBClient } = require('../config/client');
//Const-vars
let dynamo;
let metadata;
let items;
let msgResponse;
let msgLog;

/**
 * Gets price data for trend analysis
 * @param {string} startDate - Start date
 * @param {string} endDate - End date
 * @returns {Promise<Array>} - Price data
 */
const getPriceData = async (startDate, endDate) => {
    try {
        metadata = null;
        items = null;
        msgResponse = null;
        msgLog = null;

        dynamo = await dynamoDBClient();

        metadata = await dynamo.send(
            new ScanCommand({
                TableName: process.env.BIOET_PRECIOS_TABLE_NAME,
                FilterExpression: 'periodo >= :start AND periodo <= :end',
                ExpressionAttributeValues: {
                    ':start': startDate,
                    ':end': endDate
                }
            })
        );

        if (metadata != null) {
            items = metadata.Items;
        }

        return items || [];
    } catch (error) {
        msgResponse = 'ERROR in getPriceData() function.';
        msgLog = msgResponse + `Caused by ${error}`;
        console.log(msgLog);
        return [];
    }
};

module.exports = {
    getPriceData
}; 