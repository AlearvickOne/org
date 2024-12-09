import { DataSource } from 'typeorm';
import { dataSource } from '../../../../../data-source';
import { UsersEntity } from './entitys/users.entity';
import { Logger } from '@nestjs/common';

const entities = [UsersEntity];

export const databaseProviders = [
  {
    provide: DataSource,
    useFactory: async () => {
      dataSource
        .setOptions({
          entities: entities,
          migrations: [],
        })
        .initialize()
        .then(() => Logger.debug('Подключение к базе данных прошло успешно'))
        .catch((e) => {
          throw new Error(`Ошибка подключения к базе данных - ${e.message}`);
        });
    },
  },
];
