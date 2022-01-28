import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class RolesData1643393316877 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO Role VALUES ('${uuidv4()}', 'user')`);
    await queryRunner.query(`INSERT INTO Role VALUES ('${uuidv4()}', 'admin')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM Role WHERE name='user'`);
    await queryRunner.query(`DELETE FROM Role WHERE name='admin'`);
  }
}
