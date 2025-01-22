import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUsersComments1737489106559
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`Create table users_comments (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    blog_id INT,
    body VARCHAR(8000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
