//External Imports
const { Validator } = require('node-input-validator');
//Const/vars
let msgResponse;
let msgLog;

/**
 * @description We validate the request body parameters for add an item to the bioethanol prices table into database
 * @param {object} eventBody event.body type
 * @returns {object} Object containing validation result and errors if any
 */
const validateBodyAddItemParamsBioetPrecios = async (eventBody) => {
  try {
    if (!eventBody) {
      return {
        isValid: false,
        errors: {
          'data': {
            message: 'Request body is required'
          }
        }
      };
    }

    // Construcción del objeto a validar
    const eventBodyObj = {
      data: {
        periodo: eventBody.periodo,
        bioetanol_azucar: eventBody.bioetanol_azucar,
        bioetanol_maiz: eventBody.bioetanol_maiz,
        unidad_medida: eventBody.unidad_medida,
        fuente_datos: eventBody.fuente_datos,
        region: eventBody.region,
        variacion_anual: eventBody.variacion_anual,
        variacion_mensual: eventBody.variacion_mensual,
        observaciones: eventBody.observaciones
      },
    };

    // Reglas de validación
    const rules = {
      'data.periodo': 'required|string|maxLength:12',
      'data.bioetanol_azucar': 'required|string|minLength:3|maxLength:10',
      'data.bioetanol_maiz': 'required|string|minLength:3|maxLength:10',
      'data.unidad_medida': 'required|string|maxLength:10',
      'data.fuente_datos': 'required|string|maxLength:50',
      'data.region': 'required|string|maxLength:30',
      'data.variacion_anual': 'required|string|maxLength:10',
      'data.variacion_mensual': 'required|string|maxLength:10',
      'data.observaciones': 'required|string|maxLength:200'
    };

    // Validación con la biblioteca Validator
    const validator = new Validator(eventBodyObj, rules);
    const isValid = await validator.check();

    return {
      isValid,
      errors: validator.errors
    };
  } catch (error) {
    msgResponse = 'ERROR in validateBodyAddItemParamsBioetPrecios() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return {
      isValid: false,
      errors: {
        'system': {
          message: msgResponse
        }
      }
    };
  }
};

/**
 * @description Validates the request body parameters for adding an item to the bioethanol total table in the database.
 * @param {object} eventBody - The body of the event.
 * @returns {boolean} True if the validation passes, otherwise false.
 */
const validateBodyAddItemParamsBioetTotal = async (eventBody) => {
  try {
    if (!eventBody) {
      return
    }

    // Build the object to validate
    const eventBodyObj = {
      data: {
        periodo: eventBody.periodo,
        produccion: eventBody.produccion,
        ventas_totales: eventBody.ventas_totales,
      },
    };

    // Validation rules
    const rules = {
      'data.periodo': 'required|string|maxLength:12',
      'data.produccion': 'required|string|minLength:3|maxLength:20',
      'data.ventas_totales': 'required|string|minLength:3|maxLength:20',
    };

    // Perform validation
    const validator = new Validator(eventBodyObj, rules);
    const isValid = await validator.check();

    return isValid; // Return validation result
  } catch (error) {
    msgResponse = 'ERROR in validateBodyAddItemParamsBioetPrecios() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return msgResponse;
  }
};


/**
 * @description Validates the request body parameters for adding an item to the bioethanol types table in the database.
 * @param {object} eventBody - The body of the event.
 * @returns {object} Object containing validation result and errors if any
 */
const validateBodyAddItemParamsBioetTipos = async (eventBody) => {
  try {
    if (!eventBody) {
      return {
        isValid: false,
        errors: {
          'data': {
            message: 'Request body is required'
          }
        }
      };
    }

    // Build the object to validate
    const eventBodyObj = {
      data: {
        tipo: eventBody.tipo,
        periodo: eventBody.periodo,
        produccion: eventBody.produccion,
        ventas_totales: eventBody.ventas_totales,
        capacidad_instalada: eventBody.capacidad_instalada,
        eficiencia_produccion: eventBody.eficiencia_produccion,
        materia_prima: eventBody.materia_prima,
        ubicacion: eventBody.ubicacion,
        estado_operativo: eventBody.estado_operativo,
        observaciones: eventBody.observaciones
      },
    };

    // Validation rules - all fields are required
    const rules = {
      'data.tipo': 'required|string|maxLength:12',
      'data.periodo': 'required|string|maxLength:12',
      'data.produccion': 'required|string|minLength:3|maxLength:20',
      'data.ventas_totales': 'required|string|minLength:3|maxLength:20',
      'data.capacidad_instalada': 'required|string|minLength:3|maxLength:20',
      'data.eficiencia_produccion': 'required|string|minLength:3|maxLength:20',
      'data.materia_prima': 'required|string|maxLength:50',
      'data.ubicacion': 'required|string|maxLength:100',
      'data.estado_operativo': 'required|string|maxLength:20',
      'data.observaciones': 'required|string|maxLength:200'
    };

    // Perform validation
    const validator = new Validator(eventBodyObj, rules);
    const isValid = await validator.check();

    return {
      isValid,
      errors: validator.errors
    };
  } catch (error) {
    msgResponse = 'ERROR in validateBodyAddItemParamsBioetTipos() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return {
      isValid: false,
      errors: {
        'system': {
          message: msgResponse
        }
      }
    };
  }
};

module.exports = {
  validateBodyAddItemParamsBioetPrecios,
  validateBodyAddItemParamsBioetTotal,
  validateBodyAddItemParamsBioetTipos,
};
