import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUsers1733670537627 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE users (
        id INT UNSIGNED UNIQUE AUTO_INCREMENT PRIMARY KEY,
        role INT,
        name VARCHAR(50),
        surname VARCHAR(50),
        email VARCHAR(50),
        password VARCHAR(255),
        phone VARCHAR(50),
        token VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
