import * as joi from 'joi';
import Validator from 'validator';
import { PasswordValidationException } from '../../exception/password-validation.exception';

export const passwordSchema = joi.string().custom((value) => {
  if (
    !Validator.isStrongPassword(value, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    })
  ) {
    throw new PasswordValidationException();
  }
});
