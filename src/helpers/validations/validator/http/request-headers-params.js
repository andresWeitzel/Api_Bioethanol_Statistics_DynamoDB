//External Imports
const { Validator } = require('node-input-validator');
//Const/vars
let msgResponse;
let msgLog;

/**
 * @description Validates the request headers parameters.
 * @param {object} eventHeaders - The headers of the event.
 * @returns {boolean} True if the validation passes, otherwise false.
 */
const validateHeadersParams = async (eventHeaders) => {
  try {
    // Build the object to validate
    const eventHeadersObj = {
      headers: {
        contentType: eventHeaders['Content-Type'],
        authorization: eventHeaders['Authorization'],
        xApiKey: eventHeaders['x-api-key'],
      },
    };

    // Validation rules
    const rules = {
      'headers.contentType': 'required|string|maxLength:20',
      'headers.authorization': 'required|string|minLength:100|maxLength:400',
      'headers.xApiKey': 'required|string|minLength:30|maxLength:100',
    };

    // Perform validation
    const validator = new Validator(eventHeadersObj, rules);
    const isValid = await validator.check();

    return isValid; // Return validation result
  } catch (error) {
    msgResponse = 'ERROR in validateHeadersParams() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return msgResponse;
  }
};

module.exports = {
  validateHeadersParams,
};
