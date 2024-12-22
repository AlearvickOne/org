import {
  registerDecorator,
  ValidationArguments,
  ValidatorOptions,
} from 'class-validator';
import { UsersEntity } from '../../../app/database/entitys/users.entity';

interface IsNicknameExistProps {
  message: string;
}

export function IsNicknameExist(
  options: IsNicknameExistProps,
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
          const user = await UsersEntity.findOneBy({ nickname: value });

          return !user ? true : false;
        },

        defaultMessage(validationArguments?: ValidationArguments) {
          return validationArguments.constraints[0];
        },
      },
    });
  };
}
