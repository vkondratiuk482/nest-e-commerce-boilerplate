import { MigrationInterface, QueryRunner } from 'typeorm';

export class StripeId1643880018612 implements MigrationInterface {
  name = 'StripeId1643880018612';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" ADD "stripeId" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" ALTER COLUMN "userId" DROP NOT NULL`,
    );
  }
}
