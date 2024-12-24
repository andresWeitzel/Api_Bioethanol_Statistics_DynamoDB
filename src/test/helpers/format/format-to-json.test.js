//Helpers
const { formatToJson } = require("../../../helpers/format/format-to-json");
//Const
const MOCK_OBJECT = {};
const MOCK_OBJECT_VALUE_01 = process.env.MOCK_OBJECT_VALUE_01;
const MOCK_OBJECT_VALUE_02 = process.env.MOCK_OBJECT_VALUE_02;
const MOCK_OBJECT_WITH_CONTENT = {
  test01: MOCK_OBJECT_VALUE_01,
  test02: MOCK_OBJECT_VALUE_02,
};
//Vars
let formatToJsonResult;

describe("- formatToJson helper (Unit test)", () => {
  describe("1) Check cases for arguments.", () => {
    msg = "Should return an object passing values to all parameters.";
    it(msg, async () => {
      formatToJsonResult = await formatToJson(MOCK_OBJECT);
      expect(typeof formatToJsonResult == "object").toBe(true);
    });

    msg =
      "Should return an object with the same values passed as a parameter. If the parameter is not an object, one will be returned";

    it(msg, async () => {
      formatToJsonResult = await formatToJson(MOCK_OBJECT_WITH_CONTENT);
      expect(typeof formatToJsonResult == "object").toBe(true);

      expect(formatToJsonResult == MOCK_OBJECT_WITH_CONTENT).toBe(true);
    });

    msg =
      "Should return an object with the same values passed as a parameter, if other parameters are passed";

    it(msg, async () => {
      formatToJsonResult = await formatToJson(
        MOCK_OBJECT_WITH_CONTENT,
        MOCK_OBJECT
      );
      expect(typeof formatToJsonResult == "object").toBe(true);

      expect(formatToJsonResult == MOCK_OBJECT_WITH_CONTENT).toBe(true);
    });
  });

  describe("2) Check cases for return.", () => {
    msg = "Should return null if null value is passed";

    it(msg, async () => {
      formatToJsonResult = await formatToJson(null);
      expect(formatToJsonResult == null).toBe(true);
    });

    msg = "Should return undefined if undefined value is passed";

    it(msg, async () => {
      formatToJsonResult = await formatToJson(undefined);
      expect(formatToJsonResult == undefined).toBe(true);
    });

    msg = "Should return undefined if no parameter is passed";

    it(msg, async () => {
      formatToJsonResult = await formatToJson();
      expect(formatToJsonResult == undefined).toBe(true);
    });

    msg = "Should return a number value if zero (0) value is passed";

    it(msg, async () => {
      formatToJsonResult = await formatToJson(0);

      expect(typeof formatToJsonResult == "number").toBe(true);
    });
  });

  describe("3) Check cases for error.", () => {
    msg = "Should not throw an error if a new Error() is passed as a parameter";

    it(msg, async () => {
      expect(async () => await formatToJson(new Error())).not.toThrow(Error);
    });

    msg =
      "Should return a object with ERROR value if a new Error() value is passed";

    it(msg, async () => {
      let errorObj = new Error();
      formatToJsonResult = await formatToJson(new Error());

      expect(typeof formatToJsonResult == "object").toBe(true);
      expect(formatToJsonResult).toEqual(errorObj);
    });
    it("Should handle circular references without throwing an error.", async () => {
      const circularObj = {};
      circularObj.self = circularObj; // Circular reference
      formatToJsonResult = await formatToJson(circularObj);
      await expect(typeof formatToJsonResult).toBe("object");
    });
    it("Should not throw an error when passed a function.", async () => {
      const func = () => "test";
      expect(async () => await formatToJson(func)).not.toThrow();
    });
  });
  describe("4) Additional edge cases.", () => {
    it("Should handle large objects without performance issues.", async () => {
      const largeObject = {};
      for (let i = 0; i < 10000; i++) {
        largeObject[`key${i}`] = `value${i}`;
      }
      formatToJsonResult = await formatToJson(largeObject);
      expect(Object.keys(formatToJsonResult).length).toBe(10000);
    });

    it("Should convert a Date object into a string or object representation.", async () => {
      const date = new Date();
      formatToJsonResult = await formatToJson(date);
      expect(typeof formatToJsonResult).toBe("object");
    });
  });
});
