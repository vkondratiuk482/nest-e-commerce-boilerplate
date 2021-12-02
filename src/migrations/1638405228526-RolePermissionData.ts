import { MigrationInterface, QueryRunner } from 'typeorm';

export class RolePermissionData1638405228526 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO role_permissions_permission VALUES('2d9bb3aa-c694-43f2-b29e-0d7afe38758c', 'b4b47f47-d662-4389-a4e0-fb27363da85b')`,
    );

    await queryRunner.query(
      `INSERT INTO role_permissions_permission VALUES('2d9bb3aa-c694-43f2-b29e-0d7afe38758c', 'd54d8b11-2084-4d2c-817a-a5d07f339fa7')`,
    );

    await queryRunner.query(
      `INSERT INTO role_permissions_permission VALUES('2d9bb3aa-c694-43f2-b29e-0d7afe38758c', '070634bf-867b-4a97-ac91-09c789357bfb')`,
    );

    await queryRunner.query(
      `INSERT INTO role_permissions_permission VALUES('2d9bb3aa-c694-43f2-b29e-0d7afe38758c', '114406ca-7f33-4e12-ab9f-17c4e0169772')`,
    );

    await queryRunner.query(
      `INSERT INTO role_permissions_permission VALUES('be61da60-eb07-4885-935b-6b3879c84154', '84efab78-cfa8-4b94-9520-23bcc9497256')`,
    );

    await queryRunner.query(
      `INSERT INTO role_permissions_permission VALUES('be61da60-eb07-4885-935b-6b3879c84154', '7445fedf-0c7d-42b4-9b22-4497b521d0da')`,
    );

    await queryRunner.query(
      `INSERT INTO role_permissions_permission VALUES('be61da60-eb07-4885-935b-6b3879c84154', '4fa3ef55-1824-4ac6-ba80-0ce3f496d6db')`,
    );

    await queryRunner.query(
      `INSERT INTO role_permissions_permission VALUES('be61da60-eb07-4885-935b-6b3879c84154', '0da77b45-c3f1-486a-a780-9fc18287f599')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM Permission WHERE roleId='2d9bb3aa-c694-43f2-b29e-0d7afe38758c'`,
    );

    await queryRunner.query(
      `DELETE FROM Permission WHERE roleId='be61da60-eb07-4885-935b-6b3879c84154'`,
    );
  }
}
