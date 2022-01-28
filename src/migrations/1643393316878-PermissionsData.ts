import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class PermissionsData1643393316878 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO Permission VALUES('${uuidv4()}', 'CREATE_ORDER_SELF', 'create an order')`,
    );

    await queryRunner.query(
      `INSERT INTO Permission VALUES('${uuidv4()}', 'GET_ORDER_SELF', 'get your order')`,
    );

    await queryRunner.query(
      `INSERT INTO Permission VALUES('${uuidv4()}', 'REMOVE_ORDER_ALL', 'remove an order for any user')`,
    );

    await queryRunner.query(
      `INSERT INTO Permission VALUES('${uuidv4()}', 'UPDATE_ORDER_ALL', 'update an order for any user')`,
    );

    await queryRunner.query(
      `INSERT INTO Permission VALUES('${uuidv4()}', 'GET_ORDER_ALL', 'get any order of any user')`,
    );

    await queryRunner.query(
      `INSERT INTO Permission VALUES('${uuidv4()}', 'CRUD_PRODUCT_ALL', 'crud functionality for products')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM Permission`);
  }
}
