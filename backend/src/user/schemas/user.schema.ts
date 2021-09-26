import * as joi from 'joi';
import { passwordSchema } from './password.schema';
import { PasswordValidationException } from '../../exception/password-validation.exception';
import { UsernameValidationException } from '../../exception/username-validation.exception';

export const userSchema = joi.object({
  username: joi
    .string()
    .required()
    .max(50)
    .min(4)
    .regex(/(^[a-zA-Z0-9]{1}([a-zA-Z0-9-_]{2,48})[a-zA-Z0-9]{1}$)/)
    .error(new UsernameValidationException()),
  password: passwordSchema.error(new PasswordValidationException()),
  password2: passwordSchema.error(new PasswordValidationException()),
});
