//Const-vars
let msgResponse;
let msgLog;

/**
 * @description Convert to json format
 * @param {Object} obj Object type
 * @returns an object json with this format
 */
const formatToJson = async (obj) => {
  try {
    msgResponse = null;
    msgLog = null;
    if (obj == (null || undefined)) {
      return obj;
    } else if (typeof obj != 'object') {
      
      obj = await JSON.parse(obj);
    }

    return obj;
  } catch (error) {
    msgResponse = 'ERROR in formatToJson() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return msgResponse;
  }
};

module.exports = {
  formatToJson,
};
