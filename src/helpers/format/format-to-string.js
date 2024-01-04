//Const
const FORMAT_TO_STRING_ERROR_MESSAGE = 'ERROR in formatToString helper function.';
//Vars
let msgResponse;
let msgLog;
/**
 * @description Convert to string format
 * @param {Object} obj Object type
 * @returns an object string with this format
 */
const formatToString = async (obj) => {
  try {
    msgResponse = null;
    msgLog = null;
    if (typeof obj != 'string') {
      obj = JSON.stringify(obj, null, 2);
    }

    return obj;
  } catch (error) {
    msgResponse = FORMAT_TO_STRING_ERROR_MESSAGE;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return msgResponse;
  }
};

module.exports = {
  formatToString,
};
