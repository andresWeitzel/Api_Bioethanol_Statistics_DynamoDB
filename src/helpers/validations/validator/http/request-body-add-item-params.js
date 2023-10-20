//External Imports
const { Validator } = require('node-input-validator');
//Const/vars
let validateCheck;
let validatorObj;
let eventBodyObj;
let msgResponse;
let msgLog;

/**
 * @description We validate the request body parameters for add an item to the bioethanol prices table into database
 * @param {object} eventBody event.body type
 * @returns a boolean
 */
const validateBodyAddItemParamsBioetPrecios = async (eventBody) => {
  eventBodyObj = null;
  validatorObj = null;
  validateCheck = false;
  msgResponse = null;
  msgLog = null;

  try {
    if (eventBody != null) {
      eventBodyObj = {
        data: {
          periodo: await eventBody.periodo,
          bioetanol_azucar: await eventBody.bioetanol_azucar,
          bioetanol_maiz: await eventBody.bioetanol_maiz,
        },
      };

      validatorObj = new Validator(
        {
          eventBodyObj,
        },
        {
          'eventBodyObj.data.periodo': 'required|string|maxLength:12',
          'eventBodyObj.data.bioetanol_azucar':
            'required|string|minLength:3|maxLength:10',
          'eventBodyObj.data.bioetanol_maiz':
            'required|string|minLength:3|maxLength:10',
        },
      );
      validateCheck = await validatorObj.check();
    }
    return validateCheck;
  } catch (error) {
    msgResponse = 'ERROR in validateBodyAddItemParamsBioetPrecios() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return msgResponse;
  }
};

/**
 * @description We validate the request body parameters for add an item to the bioethanol total table into database
 * @param {object} eventBody event.body type
 * @returns a boolean
 */
const validateBodyAddItemParamsBioetTotal = async (eventBody) => {
  eventBodyObj = null;
  validatorObj = null;
  validateCheck = false;
  msgResponse = null;
  msgLog = null;

  try {
    if (eventBody != null) {
      eventBodyObj = {
        data: {
          periodo: await eventBody.periodo,
          produccion: await eventBody.produccion,
          ventas_totales: await eventBody.ventas_totales,
        },
      };

      validatorObj = new Validator(
        {
          eventBodyObj,
        },
        {
          'eventBodyObj.data.periodo': 'required|string|maxLength:12',
          'eventBodyObj.data.produccion':
            'required|string|minLength:3|maxLength:20',
          'eventBodyObj.data.ventas_totales':
            'required|string|minLength:3|maxLength:20',
        },
      );
      validateCheck = await validatorObj.check();
    }
    return validateCheck;
  } catch (error) {
    msgResponse = 'ERROR in validateBodyAddItemParamsBioetTotal() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return msgResponse;
  }
};

module.exports = {
  validateBodyAddItemParamsBioetPrecios,
  validateBodyAddItemParamsBioetTotal,
};
