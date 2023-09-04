//External
const { uuid } = require('uuidv4');

/**
 * @description Generate uuid 
 * @returns a integer
 * @example 109401114
 */
const generateUUID = async () => {
    try {
        return uuid();
    } catch (error) {
        console.log(`Error in  generateUUID(), caused by ${error}`);
        console.error(error.stack);
        return null;
    }
}

module.exports = {
    generateUUID
}