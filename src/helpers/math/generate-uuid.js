//External
const { v4 : uuidv4 } = require('uuid');
//Const-vars
let msgResponse;
let msgLog;

/**
 * @description Generate uuid 
 * @returns a integer
 * @example 109401114
 */
const generateUUID = async () => {
    try {
        msgResponse = null;
        msgLog = null;
        return uuidv4();
    } catch (error) {
        msgResponse = 'ERROR in generateUUID() function.';
        msgLog = msgResponse + `Caused by ${error}`;
        console.log(msgLog);
        return msgResponse;
    }
}

module.exports = {
    generateUUID
}