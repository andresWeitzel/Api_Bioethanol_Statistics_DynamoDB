//External
const { v4 : uuidv4 } = require('uuid');

/**
 * @description Generate uuid 
 * @returns a integer
 * @example 109401114
 */
const generateUUID = async () => {
    try {
        return uuidv4();
    } catch (error) {
        console.log(`Error in  generateUUID(), caused by ${error}`);
        console.error(error.stack);
        return null;
    }
}

module.exports = {
    generateUUID
}