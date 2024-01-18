'use strict';
//Helpers
const { bodyResponse } = require('../../../helpers/http/body-response');
const {
  statusCode,
  statusCodeDetails,
} = require('../../../enums/http/status-code');
//const
const OK_CODE = statusCode.OK;
const OK_CODE_DETAILS = statusCodeDetails.OK;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const BAD_REQUEST_CODE_DETAILS = statusCodeDetails.BAD_REQUEST_CODE_DETAILS;
//Vars
let msg;
let bodyResponseResult;

describe('- bodyResponse helper (Unit test)', () => {
  //--Start first suite --
  describe('1) Check cases for each argument.', () => {
    msg = 'Should return an object passing values to all parameters.';
    it(msg, async () => {
      bodyResponseResult = await bodyResponse(OK_CODE, OK_CODE_DETAILS);
      await expect(typeof bodyResponseResult == 'object').toBe(true);
    });

    msg =
      'Should return an object with the same values of the status code and the message passed as a parameter.';

    it(msg, async () => {
      bodyResponseResult = await bodyResponse(OK_CODE, OK_CODE_DETAILS);
      expect(typeof bodyResponseResult == 'object').toBe(true);

      expect(bodyResponseResult.statusCode == OK_CODE).toBe(true);

      let bodyConversion = JSON.parse(bodyResponseResult.body);

      let bodyConversionMessage = JSON.stringify(bodyConversion.message);

      expect(bodyConversionMessage == JSON.stringify(OK_CODE_DETAILS)).toBe(
        true,
      );
    });

    msg =
      'Should return an object with the value of the statusCode parameter of type any (Number or String)';

    it(msg, async () => {
      bodyResponseResult = await bodyResponse(
        BAD_REQUEST_CODE,
        BAD_REQUEST_CODE_DETAILS,
      );

      expect(typeof bodyResponseResult == 'object').toBe(true);

      expect(
        typeof bodyResponseResult.statusCode == 'number' ||
          typeof bodyResponseResult.statusCode == 'string',
      ).toBe(true);
    });

    msg =
      'Should return an object with the value of the body parameter of type string';

    it(msg, async () => {
      bodyResponseResult = await bodyResponse(
        BAD_REQUEST_CODE,
        BAD_REQUEST_CODE_DETAILS,
      );

      expect(typeof bodyResponseResult == 'object').toBe(true);

      expect(typeof bodyResponseResult.body == 'string').toBe(true);
    });

    msg = 'Should return an object if no parameters are passed.';

    it(msg, async () => {
      bodyResponseResult = await bodyResponse();

      expect(typeof bodyResponseResult == 'object').toBe(true);
    });

    msg =
      "Should return an object with the value undefined for statusCode and '{}' for body if no parameters are passed.";

    it(msg, async () => {
      bodyResponseResult = await bodyResponse();

      expect(typeof bodyResponseResult == 'object').toBe(true);

      expect(bodyResponseResult.statusCode == undefined).toBe(true);

      expect(bodyResponseResult.body == '{}').toBe(true);
    });

    msg =
      'Should return an object with the value null for statusCode if null is passed as a parameter for statusCode argument.';

    it(msg, async () => {
      bodyResponseResult = await bodyResponse(null);

      expect(typeof bodyResponseResult == 'object').toBe(true);

      expect(bodyResponseResult.statusCode == null).toBe(true);
    });

    msg =
      'Should return an object with string format for body if null is passed as a parameter for message argument.';

    it(msg, async () => {
      bodyResponseResult = await bodyResponse(BAD_REQUEST_CODE, null);

      console.log(typeof bodyResponseResult.body);

      expect(typeof bodyResponseResult == 'object').toBe(true);

      expect(typeof bodyResponseResult.body == 'string').toBe(true);
    });

    msg =
      'Should return an object with the value undefined for statusCode if a value is not passed as a parameter for statusCode argument.';

    it(msg, async () => {
      bodyResponseResult = await bodyResponse();

      expect(typeof bodyResponseResult == 'object').toBe(true);

      expect(bodyResponseResult.statusCode == undefined).toBe(true);
    });
  });

  describe('2) Check cases for error.', () => {
    msg = 'Should return a boolean with value false if an new Error is passed';
    it(msg, async () => {
      await expect(async () => await bodyResponse(new Error())).not.toThrow(
        Error,
      );
    });
  });
});
