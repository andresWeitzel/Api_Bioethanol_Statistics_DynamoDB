
/**
 * @description Convert to string format
 * @param {Object} obj Object type
 * @returns an object string with this format
 */
const formatToString = async (obj) => {
    try {
        if (typeof obj != 'string') {
            obj = JSON.stringify(obj, null, 2);
        }
    } catch (error) {
        console.log(`Error in formatToString(), caused by ${{error}}`);
        console.error(error.stack);
    }
    return obj;
}

module.exports = {
    formatToString
}