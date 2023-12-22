//Helpers
const { formatToJson } = require("../../../helpers/format/format-to-json");
//Const
const MOCK_OBJECT = {};
const MOCK_OBJECT_WITH_CONTENT = { test01: "test01", test02: "test02" };
//Vars
let formatToJsonResult;

describe("- formatToJson helper (Unit test)", () => {
  describe("1) Check cases for each argument.", () => {
    msg = "Should return an object passing values to all parameters.";
    it(msg, async () => {
      formatToJsonResult = await formatToJson(MOCK_OBJECT);
      await expect(typeof formatToJsonResult == "object").toBe(true);
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

    msg = "Should return null if null is passed";

    it(msg, async () => {
      formatToJsonResult = await formatToJson(null);
      expect(formatToJsonResult == null).toBe(true);
    });

    msg = "Should return undefined if undefined is passed";

    it(msg, async () => {
      formatToJsonResult = await formatToJson(undefined);
      expect(formatToJsonResult == undefined).toBe(true);
    });

    msg = "Should return undefined if no parameter is passed";

    it(msg, async () => {
      formatToJsonResult = await formatToJson();
      expect(formatToJsonResult == undefined).toBe(true);
    });
  });

  //checks errors here
  describe("2) Check cases for error.", () => {
    // msg = "Should not throw an Error if an new Error() is passed";
    // it(msg, async () => {
    //   expect(async() => await formatToJson(new Error())).not.toThrow(Error);
    // });
    // msg = "Should throw an error if an new Error() is passed";
    // it(msg, async () => {
    //     let v =  await formatToJson(new Error());
    //     console.log(v);
    //   expect(async() => await formatToJson(new Error())).toThrow("ERROR in formatToJson() function.");
    // });
    // msg =
    //   "Should return a string with the value of treated error if an error is passed";
    // it(msg, async () => {
    //   formatToJsonResult = await formatToJson(new Error());
    //   console.log(formatToJsonResult);
    //   expect(typeof formatToJsonResult == "string").toBe(true);
    // });

  });
});
