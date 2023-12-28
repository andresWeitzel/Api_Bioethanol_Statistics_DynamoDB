'use strict';
//Helpers
const { currentDateTime } = require('../../../helpers/date-time/dates');
const {
  calculateNumberOfCharactersMatch,
} = require('../../../helpers/math/string/characters');
//Const
const TODAY_DATE = new Date();
//Vars
let msg;
let currentDateTimeResult;

describe('- currentDateTime helper (Unit Test)', () => {
  describe('1) Check cases for arguments.', () => {
    msg =
      'Should return a string type if no arguments are passed (this function don´t has arguments)';
    it(msg, async () => {
      currentDateTimeResult = await currentDateTime();
      await expect(typeof currentDateTimeResult == 'string').toBe(true);
    });

    msg = 'Should return a string type if others arguments are passed ';
    it(msg, async () => {
      currentDateTimeResult = await currentDateTime(TODAY_DATE);
      await expect(typeof currentDateTimeResult == 'string').toBe(true);
    });

    msg = 'Should return a string type if a null value is passed';
    it(msg, async () => {
      currentDateTimeResult = await currentDateTime(null);
      await expect(typeof currentDateTimeResult == 'string').toBe(true);
    });

    msg = 'Should return a string type if a undefined value is passed';
    it(msg, async () => {
      currentDateTimeResult = await currentDateTime(undefined);
      await expect(typeof currentDateTimeResult == 'string').toBe(true);
    });
  });

  describe('2) Check cases for return.', () => {
    msg =
      "Should return a string type with 'DD/MM/YY HH:MM:SS' format (Ex: 2023-03-18 21:06:15)";
    it(msg, async () => {
      currentDateTimeResult = await currentDateTime();
      await expect(typeof currentDateTimeResult == 'string').toBe(true);
      let characters = '/,:';
      let totalCharacters = 4; // total characters for DD/MM/YY HH:MM:SS
      let numberCharactersMatch = await calculateNumberOfCharactersMatch(
        currentDateTimeResult,
        characters,
      );
      await expect(numberCharactersMatch >= totalCharacters).toBe(true);
    });
  });

  describe('3) Check cases for error.', () => {
    msg =
      'Should not return a error message if no argument is passed to the function.';
    it(msg, async () => {
      await expect(async () => await currentDateTime()).not.toThrow(Error);
      currentDateTimeResult = await currentDateTime();
      await expect(typeof currentDateTimeResult == 'string').toBe(true);
    });

    msg = 'Should return a string value if a new Error is passed';
    it(msg, async () => {
      currentDateTimeResult = await currentDateTime(new Error());
      await expect(typeof currentDateTimeResult == 'string').toBe(true);
    });
  });
});
