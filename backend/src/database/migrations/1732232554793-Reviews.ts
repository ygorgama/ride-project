import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Reviews1732232554793 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.createTable(
			new Table(
				{
					name: "reviews",
					columns: [
						{
							name: "id",
							type: "bigint",
							isPrimary: true,
							isGenerated:  true,
							isNullable: false
						},
						{
							name: "raiting",
							type: "int",
							isNullable: false,
						},
						{
							name: "comment",
							type: "text",
							isNullable: false
						},
					]
				}
			)
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.dropTable("reviews", true, true);
	}

}
