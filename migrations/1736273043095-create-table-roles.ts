import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableRoles1736273043095 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE roles (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    role INT UNIQUE,
    name VARCHAR(50)
)`);

    await queryRunner.query(
      `INSERT INTO roles (role, name) VALUE (1, 'Админ'), (2,'Редактор'), (3,'Пользователь');`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
