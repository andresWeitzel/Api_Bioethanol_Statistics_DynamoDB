//Const/vars
let newUUID;

/**
 * @description Generate uuid 
 * @returns a integer
 * @example 109401114
 */
const generateUUID = async () => {
    newUUID = null;
    try {
        newUUID = parseInt(Math.random() * 10000000 + 100000000);
    } catch (error) {
        console.log(`Error in  generateUUID(), caused by ${{error}}`);
    }
    return newUUID;
}

module.exports = {
    generateUUID
}