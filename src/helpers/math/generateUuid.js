//External
const { uuid } = require('uuidv4');


/**
 * @description Generate a uuid through external library
 * @returns a string
 * @example '75442486-0878-440c-9db1-a7006c25a39f'
 */
const generateUUID = async () => {
    try {
        return uuid();
    } catch (error) {
        console.log(`Error in  generateUUID(), caused by ${error}`);
        console.error(error.stack);
    }
    return newUUID;
}

module.exports = {
    generateUUID
}