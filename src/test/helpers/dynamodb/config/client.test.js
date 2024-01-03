"use strict";
//Helpers
const {
  dynamoDBClient,
} = require("../../../../helpers/dynamodb/config/client");
//Const
const MOCK_OBJECT = {};
//Vars
let msg;
let dynamoDBClientResult;

describe("- dynamoDBClient helper (Unit Test)", () => {
  describe("1) Check cases for arguments.", () => {
    msg =
      "Should return a object type if no arguments are passed (This function does not expect arguments)";
    it(msg, async () => {
      dynamoDBClientResult = await dynamoDBClient();
      await expect(typeof dynamoDBClientResult == "object").toBe(true);
    });

    msg =
      "Should return a object type if one argument is passed (This function does not expect arguments)";
    it(msg, async () => {
      dynamoDBClientResult = await dynamoDBClient(MOCK_OBJECT);
      await expect(typeof dynamoDBClientResult == "object").toBe(true);
    });

    msg =
      "Should return a object type if two argument are passed (This function does not expect arguments)";
    it(msg, async () => {
      dynamoDBClientResult = await dynamoDBClient(MOCK_OBJECT, MOCK_OBJECT);
      await expect(typeof dynamoDBClientResult == "object").toBe(true);
    });

    msg =
      "Should return a object type if a null value is passed (This function does not expect arguments)";
    it(msg, async () => {
      dynamoDBClientResult = await dynamoDBClient(null);
      await expect(typeof dynamoDBClientResult == "object").toBe(true);
    });

    msg =
      "Should return a object type if a undefined value is passed (This function does not expect arguments)";
    it(msg, async () => {
      dynamoDBClientResult = await dynamoDBClient(undefined);
      await expect(typeof dynamoDBClientResult == "object").toBe(true);
    });
  });

  describe("2) Check cases for error.", () => {
    msg =
      "Should not return a error message and not throw an Error if no argument is passed to the function (This function does not expect arguments).";
    it(msg, async () => {
      await expect(async () => await dynamoDBClient()).not.toThrow(Error);
    });
    msg =
      "Should not return a error message and not throw an Error if a new Error is passed to the function (This function does not expect arguments).";
    it(msg, async () => {
      await expect(async () => await dynamoDBClient(new Error())).not.toThrow(
        Error
      );
    });
  });
});
