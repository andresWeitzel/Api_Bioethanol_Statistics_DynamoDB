//Helpers
const { formatToString } = require('../../../helpers/format/format-to-string');
//Const
const MOCK_OBJECT = {};
const MOCK_OBJECT_VALUE_01 = process.env.MOCK_OBJECT_VALUE_01;
const MOCK_BOOLEAN_VALUE_01 = process.env.MOCK_BOOLEAN_VALUE_01;
const MOCK_NUMBER_VALUE_01 = process.env.MOCK_NUMBER_VALUE_01;
//Vars
let formatToStringResult;

//Updated cases for catch

describe('- formatToString helper (Unit test)', () => {
  describe('1) Check cases for arguments.', () => {
    msg =
      'Should return a string value if not passed a string type to parameter';
    it(msg, async () => {
      formatToStringResult = await formatToString(MOCK_OBJECT);
      await expect(typeof formatToStringResult == 'string').toBe(true);
    });

    msg = 'Should return a string value if passed a string type to parameter';
    it(msg, async () => {
      formatToStringResult = await formatToString(MOCK_OBJECT_VALUE_01);
      await expect(typeof formatToStringResult == 'string').toBe(true);
    });

    msg = 'Should return a string value if passed a boolean type to parameter';
    it(msg, async () => {
      formatToStringResult = await formatToString(MOCK_BOOLEAN_VALUE_01);
      await expect(typeof formatToStringResult == 'string').toBe(true);
    });

    msg = 'Should return a string value if passed a number type to parameter';
    it(msg, async () => {
      formatToStringResult = await formatToString(MOCK_NUMBER_VALUE_01);
      await expect(typeof formatToStringResult == 'string').toBe(true);
    });
  });

  describe('2) Check cases for return.', () => {
    msg = 'Should return a string value if passed a null to parameter';
    it(msg, async () => {
      formatToStringResult = await formatToString(null);
      await expect(typeof formatToStringResult == 'string').toBe(true);
    });

    msg = 'Should return a undefined value if passed a undefined to parameter';
    it(msg, async () => {
      formatToStringResult = await formatToString(undefined);
      await expect(formatToStringResult == undefined).toBe(true);
    });

    msg = 'Should return undefined if no parameter is passed';

    it(msg, async () => {
      formatToStringResult = await formatToString();
      await expect(formatToStringResult == undefined).toBe(true);
    });

    msg = 'Should return a string value if zero (0) value is passed';

    it(msg, async () => {
      formatToStringResult = await formatToString(0);
      await expect(typeof formatToStringResult == 'string').toBe(true);
    });
  });

  describe('3) Check cases for error.', () => {
    msg = 'Should not throw an error if a new Error() is passed as a parameter';

    it(msg, async () => {
      let newError = new Error();
      formatToStringResult = await formatToString(newError);
      await expect(async () => await formatToStringResult).not.toThrow(Error);
    });

    msg =
      'Should not throw an error if a undefined value is passed as a parameter';

    it(msg, async () => {
      formatToStringResult = await formatToString(undefined);
      await expect(async () => await formatToStringResult).not.toThrow(Error);
    });
  });
});
