//Const
const CURRENT_DATE_TIME_ERROR = 'ERROR in currentDateTime helper function.';
//Vars
let msgResponse;
let msgLog;

/**
 * @description gets the current date in YYYY-MM-DD HH:MM:SS format
 * @returns a string with the indicated date format
 * @example {'2023-03-18 21:06:15'}
 */
const currentDateTime = async () => {
  try {
    let date = new Date();
    let dateNow =
      date.getFullYear() +
      '-' +
      ('00' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + date.getDate()).slice(-2) +
      ' ' +
      ('00' + date.getHours()).slice(-2) +
      ':' +
      ('00' + date.getMinutes()).slice(-2) +
      ':' +
      ('00' + date.getSeconds()).slice(-2);
    return dateNow;
  } catch (error) {
    msgResponse = CURRENT_DATE_TIME_ERROR;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return msgResponse;
  }
};

module.exports = {
  currentDateTime,
};
