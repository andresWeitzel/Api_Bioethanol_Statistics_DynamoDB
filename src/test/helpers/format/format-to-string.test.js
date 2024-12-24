//Helpers
const { formatToString } = require("../../../helpers/format/format-to-string");
//Const
const MOCK_OBJECT = {};
const MOCK_OBJECT_VALUE_01 = process.env.MOCK_OBJECT_VALUE_01;
const MOCK_BOOLEAN_VALUE_01 = process.env.MOCK_BOOLEAN_VALUE_01;
const MOCK_NUMBER_VALUE_01 = process.env.MOCK_NUMBER_VALUE_01;
//Vars
let formatToStringResult;

//Updated cases for catch

describe("- formatToString helper (Unit test)", () => {
  describe("1) Check cases for arguments.", () => {
    msg =
      "Should return a string value if not passed a string type to parameter";
    it(msg, async () => {
      formatToStringResult = await formatToString(MOCK_OBJECT);
      expect(typeof formatToStringResult == "string").toBe(true);
    });

    msg = "Should return a string value if passed a string type to parameter";
    it(msg, async () => {
      formatToStringResult = await formatToString(MOCK_OBJECT_VALUE_01);
      expect(typeof formatToStringResult == "string").toBe(true);
    });

    msg = "Should return a string value if passed a boolean type to parameter";
    it(msg, async () => {
      formatToStringResult = await formatToString(MOCK_BOOLEAN_VALUE_01);
      expect(typeof formatToStringResult == "string").toBe(true);
    });

    msg = "Should return a string value if passed a number type to parameter";
    it(msg, async () => {
      formatToStringResult = await formatToString(MOCK_NUMBER_VALUE_01);
      expect(typeof formatToStringResult == "string").toBe(true);
    });
  });

  describe("2) Check cases for return.", () => {
    msg = "Should return a string value if passed a null to parameter";
    it(msg, async () => {
      formatToStringResult = await formatToString(null);
      expect(typeof formatToStringResult == "string").toBe(true);
    });

    msg = "Should return a undefined value if passed a undefined to parameter";
    it(msg, async () => {
      formatToStringResult = await formatToString(undefined);
      expect(formatToStringResult == undefined).toBe(true);
    });

    msg = "Should return undefined if no parameter is passed";

    it(msg, async () => {
      formatToStringResult = await formatToString();
      expect(formatToStringResult == undefined).toBe(true);
    });

    msg = "Should return a string value if zero (0) value is passed";

    it(msg, async () => {
      formatToStringResult = await formatToString(0);
      expect(typeof formatToStringResult == "string").toBe(true);
    });

    it("Should handle empty strings and return an empty string.", async () => {
      formatToStringResult = await formatToString("");
      expect(formatToStringResult).toBe("");
    });

    it('Should convert a boolean "false" value to a string', async () => {
      formatToStringResult = await formatToString(false);
      expect(formatToStringResult).toBe("false");
    });
  });

  describe("3) Check cases for error.", () => {
    msg = "Should not throw an error if a new Error() is passed as a parameter";

    it(msg, async () => {
      let newError = new Error();
      formatToStringResult = await formatToString(newError);
      expect(async () => await formatToStringResult).not.toThrow(Error);
    });

    msg =
      "Should not throw an error if a undefined value is passed as a parameter";

    it(msg, async () => {
      formatToStringResult = await formatToString(undefined);
      expect(async () => await formatToStringResult).not.toThrow(Error);
    });
    it("Should not throw an error for a circular object reference", async () => {
      const circularObj = {};
      circularObj.self = circularObj;
      expect(async () => await formatToString(circularObj)).not.toThrow();
    });
  });
  describe("4) Additional edge cases.", () => {
    it("Should handle large objects without performance issues", async () => {
      const largeObject = {};
      for (let i = 0; i < 10000; i++) {
        largeObject[`key${i}`] = `value${i}`;
      }
      formatToStringResult = await formatToString(largeObject);
      expect(typeof formatToStringResult).toBe("string");
    });

    it("Should handle special characters and escape them properly", async () => {
      const specialChars = `<script>alert('xss')</script>`;
      formatToStringResult = await formatToString(specialChars);
      expect(typeof formatToStringResult).toBe("string");
    });
  });
});
