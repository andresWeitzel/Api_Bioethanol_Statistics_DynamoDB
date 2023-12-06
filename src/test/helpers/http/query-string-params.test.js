"use strict";
//Helpers

const {
  statusCode,
  statusCodeDetails,
} = require("../../../enums/http/status-code");
const {
  validatePathParameters,
} = require("../../../helpers/http/query-string-params");
//const
const OK_CODE = statusCode.OK;
const OK_CODE_DETAILS = statusCodeDetails.OK;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const BAD_REQUEST_CODE_DETAILS = statusCodeDetails.BAD_REQUEST_CODE_DETAILS;
const MOCK_OBJECT = {};
//Vars
let validObjectForTest = { queryParam: "12315236751236516235" };
let invalidObjectForTest = {};
let msg;
let validatePathParametersResult;

describe("- validatePathParameters helper (Unit test)", () => {
  describe("1) Check cases for each argument.", () => {
    msg = "Should return a boolean value if all parameters are passed.";
    it(msg, async () => {
      validatePathParametersResult = await validatePathParameters(MOCK_OBJECT);
      await expect(typeof validatePathParametersResult == "boolean").toBe(true);
    });

    msg = "Should return a boolean value if others parameters are passed.";
    it(msg, async () => {
      validatePathParametersResult = await validatePathParameters(
        MOCK_OBJECT,
        MOCK_OBJECT
      );
      await expect(typeof validatePathParametersResult == "boolean").toBe(true);
    });

    msg = "Should return a boolean value if no parameters are passed.";
    it(msg, async () => {
      validatePathParametersResult = await validatePathParameters();
      await expect(typeof validatePathParametersResult == "boolean").toBe(true);
    });
  });

  describe("2) Check cases for query parameters.", () => {
    msg =
      "Should return a boolean with value true if the parameter is not null, undefined,the length is not < 0, the length is not > 255 or not === 0.";
    it(msg, async () => {
      validatePathParametersResult = await validatePathParameters(
        validObjectForTest
      );
      await expect(validatePathParametersResult == true).toBe(true);
    });

    msg =
      "Should return a boolean with value false if the parameter is null, undefined,the length is < 0, the length is > 255 or lenght === 0.";
    it(msg, async () => {
      validatePathParametersResult = await validatePathParameters(
        invalidObjectForTest
      );
      await expect(validatePathParametersResult == false).toBe(true);
    });
  });

  describe("3) Check cases for error.", () => {
    msg = "Should return a boolean with value false if an error is passed";
    it(msg, async () => {
      validatePathParametersResult = await validatePathParameters(new Error());
      await expect(() => validatePathParametersResult).not.toThrow(Error);
    });
  });
});
