import { DataSource } from 'typeorm';
import { dataSource } from '../../../../../data-source';
import { Logger } from '@nestjs/common';
import { RolesEntity, UsersEntity } from './entities';

const entities = [UsersEntity, RolesEntity];

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
