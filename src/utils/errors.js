export const ErrorCodes = {
  PasswordMismatch: 'PASSWORD_MISMATCH',
  UserDoesntExist: 'USER_DOESNT_EXIST',
  SomethingWentWrong: 'SOMETHING_WENT_WRONG',
  UserAlreadyExists: 'USER_ALREADY_EXISTS',
  ErrorInPlacingBet: 'ERROR_IN_PLACING_BET',
};

export const ErrorMessageMap = {
  [ErrorCodes.PasswordMismatch]: 'Passwords don\'t match',
  [ErrorCodes.UserDoesntExist]: 'User doesn\'t exist',
  [ErrorCodes.SomethingWentWrong]: 'Something went wrong!',
  [ErrorCodes.UserAlreadyExists]: 'User Already Exists',
  [ErrorCodes.ErrorInPlacingBet]: 'Error in placing bet',
};

class AppError extends Error {
  constructor(errorCode, ...params) {
    super(...params);
    Error.captureStackTrace(this, AppError); // Available in Node
    const hasErrorMessage = ErrorMessageMap.hasOwnProperty(errorCode); // eslint-disable-line
    const defaultErrorCode = ErrorCodes.SomethingWentWrong;
    if (!this.message) {
      if (hasErrorMessage) {
        this.message = ErrorMessageMap[errorCode];
      } else {
        this.message = ErrorMessageMap[defaultErrorCode];
      }
    }
  }
}

export const UserExistsError = message => new AppError(ErrorCodes.UserAlreadyExists, message);

export default AppError;
