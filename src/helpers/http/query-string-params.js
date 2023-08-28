//Const/vars
let validate;

/**
 * @description validates the path parameters of the event object
 * @param {Object} object Object type
 * @returns a boolean
 */
const validatePathParameters = async (object) => {
  validate = true;

  if (object == null 
    || object == undefined 
    || object.length < 0
    || object.length > 255
    || Object.keys(object).length === 0) {
    validate = false;
  }
  return validate;
}

module.exports = {
    validatePathParameters,
  }