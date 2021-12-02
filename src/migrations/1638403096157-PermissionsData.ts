import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class PermissionsData1638403096157 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO Permission VALUES('${uuidv4()}', 'createOrderSelf', 'create an order for yourself')`,
    );

    await queryRunner.query(
      `INSERT INTO Permission VALUES('${uuidv4()}', 'removeOrderSelf', 'remove an order for yourself')`,
    );

    await queryRunner.query(
      `INSERT INTO Permission VALUES('${uuidv4()}', 'updateOrderSelf', 'update an order for yourself')`,
    );

    await queryRunner.query(
      `INSERT INTO Permission VALUES('${uuidv4()}', 'getOrderSelf', 'get your order')`,
    );

    await queryRunner.query(
      `INSERT INTO Permission VALUES('${uuidv4()}', 'createOrderAll', 'create an order for any user')`,
    );

    await queryRunner.query(
      `INSERT INTO Permission VALUES('${uuidv4()}', 'removeOrderAll', 'remove an order for any user')`,
    );

    await queryRunner.query(
      `INSERT INTO Permission VALUES('${uuidv4()}', 'updateOrderAll', 'update an order for any user')`,
    );

    await queryRunner.query(
      `INSERT INTO Permission VALUES('${uuidv4()}', 'getOrderAll', 'get any order of any user')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM Permission WHERE name='createOrderSelf'`,
    );

    await queryRunner.query(
      `DELETE FROM Permission WHERE name='removeOrderSelf'`,
    );

    await queryRunner.query(
      `DELETE FROM Permission WHERE name='updateOrderSelf'`,
    );

    await queryRunner.query(`DELETE FROM Permission WHERE name='getOrderSelf'`);

    await queryRunner.query(
      `DELETE FROM Permission WHERE name='createOrderAll'`,
    );

    await queryRunner.query(
      `DELETE FROM Permission WHERE name='removeOrderAll'`,
    );

    await queryRunner.query(
      `DELETE FROM Permission WHERE name='updateOrderAll'`,
    );

    await queryRunner.query(`DELETE FROM Permission WHERE name='getOrderAll'`);
  }
}
