import { MigrationInterface, QueryRunner } from 'typeorm';

export class RolePermissionData1643393316879 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO role_permissions_permission ("roleId", "permissionId")
      SELECT Role.id, Permission.id
      FROM Role, Permission
      WHERE Role.name = 'admin'
      AND Permission.name LIKE '%ALL%';
    `);

    await queryRunner.query(
      `INSERT INTO role_permissions_permission ("roleId", "permissionId")
      SELECT Role.id, Permission.id
      FROM Role, Permission
      WHERE Role.name = 'user'
      AND Permission.name LIKE '%SELF%';`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM role_permissions_permission`);
  }
}
