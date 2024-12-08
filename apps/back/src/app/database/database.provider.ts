import { DataSource } from 'typeorm';
import { dataSource } from '../../../../../data-source';
import { UsersEntity } from './entitys/users.entity';

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
        .then(() => console.log('Подключение прошло успешно'))
        .catch((e) => console.log(`Подключение не удачное - ${e.message}`));
    },
  },
];
