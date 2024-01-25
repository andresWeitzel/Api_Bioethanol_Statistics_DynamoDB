//Helpers
const { formatToString } = require('../../../helpers/format/format-to-string');
//Const
const MOCK_OBJECT = {};
const MOCK_OBJECT_VALUE_01 = process.env.MOCK_OBJECT_VALUE_01;
const MOCK_OBJECT_VALUE_02 = process.env.MOCK_OBJECT_VALUE_02;
const MOCK_BOOLEAN_VALUE_01 = process.env.MOCK_BOOLEAN_VALUE_01;
const MOCK_NUMBER_VALUE_01 = process.env.MOCK_NUMBER_VALUE_01;
const MOCK_OBJECT_WITH_CONTENT = {
  test01: MOCK_OBJECT_VALUE_01,
  test02: MOCK_OBJECT_VALUE_02,
};
//Vars
let formatToStringResult;

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

    // msg =
    //   'Should return an object with the same values passed as a parameter. If the parameter is not an object, one will be returned';

    // it(msg, async () => {
    //   formatToStringResult = await formatToJson(MOCK_OBJECT_WITH_CONTENT);
    //   await expect(typeof formatToStringResult == 'object').toBe(true);

    //   await expect(formatToStringResult == MOCK_OBJECT_WITH_CONTENT).toBe(true);
    // });

    // msg =
    //   'Should return an object with the same values passed as a parameter, if other parameters are passed';

    // it(msg, async () => {
    //   formatToStringResult = await formatToJson(
    //     MOCK_OBJECT_WITH_CONTENT,
    //     MOCK_OBJECT,
    //   );
    //   await expect(typeof formatToStringResult == 'object').toBe(true);

    //   await expect(formatToStringResult == MOCK_OBJECT_WITH_CONTENT).toBe(true);
    // });
  });

  //   describe('2) Check cases for return.', () => {
  //     msg = 'Should return null if null value is passed';

  //     it(msg, async () => {
  //       formatToStringResult = await formatToJson(null);
  //       await expect(formatToStringResult == null).toBe(true);
  //     });

  //     msg = 'Should return undefined if undefined value is passed';

  //     it(msg, async () => {
  //       formatToStringResult = await formatToJson(undefined);
  //       await expect(formatToStringResult == undefined).toBe(true);
  //     });

  //     msg = 'Should return undefined if no parameter is passed';

  //     it(msg, async () => {
  //       formatToStringResult = await formatToJson();
  //       await expect(formatToStringResult == undefined).toBe(true);
  //     });

  //     msg = 'Should return a number value if zero (0) value is passed';

  //     it(msg, async () => {
  //       formatToStringResult = await formatToJson(0);

  //       await expect(typeof formatToStringResult == 'number').toBe(true);
  //     });
  //   });

  //   describe('3) Check cases for error.', () => {
  //     msg = 'Should not throw an error if a new Error() is passed as a parameter';

  //     it(msg, async () => {
  //       await expect(async () => await formatToJson(new Error())).not.toThrow(
  //         Error,
  //       );
  //     });

  //     msg =
  //       'Should return a object with ERROR value if a new Error() value is passed';

  //     it(msg, async () => {
  //       let errorObj = new Error();
  //       formatToStringResult = await formatToJson(new Error());

  //       await expect(typeof formatToStringResult == 'object').toBe(true);
  //       await expect(formatToStringResult).toEqual(errorObj);
  //     });
  //   });
});
