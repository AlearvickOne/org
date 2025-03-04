import { DataSource } from 'typeorm';
import { dataSource } from '../../../../../data-source';
import { Logger } from '@nestjs/common';
import { RolesEntity, UsersEntity } from './entities';
import { BlogsEntity } from './entities/blogs.entity';
import { UsersCommentsEntity } from './entities/users_comments.entity';

const entities = [UsersEntity, RolesEntity, BlogsEntity, UsersCommentsEntity];

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
