//Helpers
const { formatToJson } = require('../../../helpers/format/format-to-json');
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

describe('- formatToJson helper (Unit test)', () => {
  describe('1) Check cases for arguments.', () => {
    msg = 'Should return an object passing values to all parameters.';
    it(msg, async () => {
      formatToJsonResult = await formatToJson(MOCK_OBJECT);
      await expect(typeof formatToJsonResult == 'object').toBe(true);
    });

    msg =
      'Should return an object with the same values passed as a parameter. If the parameter is not an object, one will be returned';

    it(msg, async () => {
      formatToJsonResult = await formatToJson(MOCK_OBJECT_WITH_CONTENT);
      await expect(typeof formatToJsonResult == 'object').toBe(true);

      await expect(formatToJsonResult == MOCK_OBJECT_WITH_CONTENT).toBe(true);
    });

    msg =
      'Should return an object with the same values passed as a parameter, if other parameters are passed';

    it(msg, async () => {
      formatToJsonResult = await formatToJson(
        MOCK_OBJECT_WITH_CONTENT,
        MOCK_OBJECT,
      );
      await expect(typeof formatToJsonResult == 'object').toBe(true);

      await expect(formatToJsonResult == MOCK_OBJECT_WITH_CONTENT).toBe(true);
    });
  });

  describe('2) Check cases for return.', () => {
    msg = 'Should return null if null value is passed';

    it(msg, async () => {
      formatToJsonResult = await formatToJson(null);
      await expect(formatToJsonResult == null).toBe(true);
    });

    msg = 'Should return undefined if undefined value is passed';

    it(msg, async () => {
      formatToJsonResult = await formatToJson(undefined);
      await expect(formatToJsonResult == undefined).toBe(true);
    });

    msg = 'Should return undefined if no parameter is passed';

    it(msg, async () => {
      formatToJsonResult = await formatToJson();
      await expect(formatToJsonResult == undefined).toBe(true);
    });

    msg = 'Should return a number value if zero (0) value is passed';

    it(msg, async () => {
      formatToJsonResult = await formatToJson(0);

      await expect(typeof formatToJsonResult == 'number').toBe(true);
    });
  });

  describe('3) Check cases for error.', () => {
    msg = 'Should not throw an error if a new Error() is passed as a parameter';

    it(msg, async () => {
      await expect(async () => await formatToJson(new Error())).not.toThrow(
        Error,
      );
    });

    msg =
      'Should return a object with ERROR value if a new Error() value is passed';

    it(msg, async () => {
      let errorObj = new Error();
      formatToJsonResult = await formatToJson(new Error());

      await expect(typeof formatToJsonResult == 'object').toBe(true);
      await expect(formatToJsonResult).toEqual(errorObj);
    });
  });
});
