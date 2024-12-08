import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'A123456',
  database: 'org',
  synchronize: false,
  migrations: ['migrations/*.ts'],
});
