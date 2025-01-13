import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableBlogs1736702376738 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`Create table blogs (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    title VARCHAR(255),
    description VARCHAR(255),
    photo VARCHAR(255),
    content LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
