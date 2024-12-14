import {
  registerDecorator,
  ValidationArguments,
  ValidatorOptions,
} from 'class-validator';
import { UsersEntity } from '../../../app/database/entitys/users.entity';

interface IsEmailExistProps {
  message: string;
}

export function IsEmailExist(
  options: IsEmailExistProps,
  validationOptions?: ValidatorOptions
) {
  return function (object: Object, propertyName: string) {
    return registerDecorator({
      name: 'name',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [options.message],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const user = await UsersEntity.findOneBy({ email: value });

          if (user) {
            return false;
          }
          return true;
        },

        defaultMessage(validationArguments?: ValidationArguments) {
          return validationArguments.constraints[0];
        },
      },
    });
  };
}
