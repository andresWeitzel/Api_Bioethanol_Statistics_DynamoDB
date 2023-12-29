'use strict';
//Helpers
const { dynamoDBClient } = require('../../../../helpers/dynamodb/config/client');
//Const
const MOCK_OBJECT = {};
//Vars
let msg;
let dynamoDBClientResult;

describe('- dynamoDBClient helper (Unit Test)', () => {
  describe('1) Check cases for arguments.', () => {
    msg =
      'Should return a object type if no arguments are passed (This function does not expect arguments)';
    it(msg, async () => {
      dynamoDBClientResult = await dynamoDBClient();
      await expect(typeof dynamoDBClientResult == 'object').toBe(true);
    });

    msg = 'Should return a object type if one argument is passed (This function does not expect arguments)';
    it(msg, async () => {
      dynamoDBClientResult = await dynamoDBClient(MOCK_OBJECT);
      await expect(typeof dynamoDBClientResult == 'object').toBe(true);
    });

    msg = 'Should return a object type if two argument are passed (This function does not expect arguments)';
    it(msg, async () => {
      dynamoDBClientResult = await dynamoDBClient(MOCK_OBJECT,MOCK_OBJECT);
      await expect(typeof dynamoDBClientResult == 'object').toBe(true);
    });

    msg = 'Should return a object type if a null value is passed (This function does not expect arguments)';
    it(msg, async () => {
      dynamoDBClientResult = await dynamoDBClient(null);
      await expect(typeof dynamoDBClientResult == 'object').toBe(true);
    });

    msg = 'Should return a object type if a undefined value is passed (This function does not expect arguments)';
    it(msg, async () => {
      dynamoDBClientResult = await dynamoDBClient(undefined);
      await expect(typeof dynamoDBClientResult == 'object').toBe(true);
    });
  });

//   describe('2) Check cases for return.', () => {
//     msg =
//       "Should return a string type with 'DD/MM/YY HH:MM:SS' format (Ex: 2023-03-18 21:06:15)";
//     it(msg, async () => {
//       dynamoDBClientResult = await currentDateTime();
//       await expect(typeof dynamoDBClientResult == 'string').toBe(true);
//       let characters = '/,:';
//       let totalCharacters = 4; // total characters for DD/MM/YY HH:MM:SS
//       let numberCharactersMatch = await calculateNumberOfCharactersMatch(
//         dynamoDBClientResult,
//         characters,
//       );
//       await expect(numberCharactersMatch >= totalCharacters).toBe(true);
//     });
//   });

//   describe('3) Check cases for error.', () => {
//     msg =
//       'Should not return a error message if no argument is passed to the function.';
//     it(msg, async () => {
//       await expect(async () => await currentDateTime()).not.toThrow(Error);
//       dynamoDBClientResult = await currentDateTime();
//       await expect(typeof dynamoDBClientResult == 'string').toBe(true);
//     });

//     msg = 'Should return a string value if a new Error is passed';
//     it(msg, async () => {
//       dynamoDBClientResult = await currentDateTime(new Error());
//       await expect(typeof dynamoDBClientResult == 'string').toBe(true);
//     });
//   });
});
