'use strict';
//Helpers
const {
  validatePathParameters,
} = require('../../../helpers/http/query-string-params');
//const
const MOCK_OBJECT = {};
const MOCK_VALID_OBJECT_01 = process.env.MOCK_VALID_OBJECT_01;
const MOCK_VALID_OBJECT = { queryParam: MOCK_VALID_OBJECT_01 };
const MOCK_INVALID_OBJECT = {};
//Vars
let msg;
let validatePathParametersResult;

describe('- validatePathParameters helper (Unit test)', () => {
  describe('1) Check cases for each argument.', () => {
    msg = 'Should return a boolean value if all parameters are passed.';
    it(msg, async () => {
      validatePathParametersResult = await validatePathParameters(MOCK_OBJECT);
      await expect(typeof validatePathParametersResult == 'boolean').toBe(true);
    });

    msg = 'Should return a boolean value if others parameters are passed.';
    it(msg, async () => {
      validatePathParametersResult = await validatePathParameters(
        MOCK_OBJECT,
        MOCK_OBJECT,
      );
      await expect(typeof validatePathParametersResult == 'boolean').toBe(true);
    });

    msg = 'Should return a boolean value if no parameters are passed.';
    it(msg, async () => {
      validatePathParametersResult = await validatePathParameters();
      await expect(typeof validatePathParametersResult == 'boolean').toBe(true);
    });
  });

  describe('2) Check cases for query parameters.', () => {
    msg =
      'Should return a boolean with value true if the parameter is not null, undefined,the length is not < 0, the length is not > 255 or not === 0.';
    it(msg, async () => {
      validatePathParametersResult = await validatePathParameters(
        MOCK_VALID_OBJECT,
      );
      await expect(validatePathParametersResult == true).toBe(true);
    });

    msg =
      'Should return a boolean with value false if the parameter is null, undefined,the length is < 0, the length is > 255 or lenght === 0.';
    it(msg, async () => {
      MOCK_INVALID_OBJECT,
        (validatePathParametersResult = await validatePathParameters());
      await expect(validatePathParametersResult == false).toBe(true);
    });
  });

  describe('3) Check cases for error.', () => {
    msg = 'Should return a boolean with value false if an new Error is passed';
    it(msg, async () => {
      await expect(
        async () => await validatePathParameters(new Error()),
      ).not.toThrow(Error);
    });
  });
});
