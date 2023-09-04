//External Imports
const {
  Validator
} = require("node-input-validator");
//Const/vars
let validateCheck;
let validatorObj;
let eventBodyObj;

/**
 * @description We validate the request body parameters for add an item to database
 * @param {object} eventBody event.body type
 * @returns a boolean
 */
const validateBodyAddItemParams = async (eventBody) => {
  eventBodyObj = null;
  validatorObj = null;
  validateCheck = false;

  try {
    if (eventBody != null) {

      eventBodyObj = {
        data: {
          periodo: await eventBody["periodo"],
          bioetanol_azucar: await eventBody["bioetanol_azucar"],
          bioetanol_maiz: await eventBody["bioetanol_maiz"],
        }
      }

      validatorObj = new Validator({
        eventBodyObj,
      }, {
        "eventBodyObj.data.periodo": "required|string|maxLength:12",
        "eventBodyObj.data.bioetanol_azucar": "required|string|minLength:3|maxLength:10",
        "eventBodyObj.data.bioetanol_maiz": "required|string|minLength:3|maxLength:10",
      });
      validateCheck = await validatorObj.check();

    }

  } catch (error) {
    console.log(`Error in validateBodyAddItemParams(), caused by ${{error}}`);
    console.error(error.stack);
  }

  return validateCheck;
}

module.exports = {
  validateBodyAddItemParams
}