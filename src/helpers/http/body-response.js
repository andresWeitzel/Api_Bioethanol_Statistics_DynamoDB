/**
 * @description get a json with the http status code, a message and input
 * @param {Number} statusCode Number type
 * @param {String} message String type
 * @param {Object} input Object type
 * @returns a json for the lambda response
 */
const bodyResponse = async (statusCode,message, input) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(
            {
                message: message,
                input: input,
            },
            null,
            2
        ),
    };
}

module.exports = { bodyResponse }