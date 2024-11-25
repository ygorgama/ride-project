import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Drivers1732235032812 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "drivers",
				columns: [
					{
						name: "id",
						type: "bigint",
						isPrimary: true,
						isGenerated: true,
						isNullable: false

					},
					{
						name: "name",
						type: "varchar",
						length: "100",
						isNullable: false
					},
					{
						name: "tax",
						type: "float",
						isNullable: false
					},
					{
						name: "minimal_km",
						type: "int",
						isNullable: false
					},
					{
						name: "reviewId",
						type: "bigint",
						isNullable: false
					},
					{
						name: "vehicleId",
						type: "bigint",
						isNullable: false
					},
					{
						name: "description",
						type: "text",
						isNullable: false
					}
				]
			})
		);

		await queryRunner.createForeignKey(
			"drivers",       
			new TableForeignKey({
				columnNames: ["reviewId"],
				referencedColumnNames: ["id"],
				referencedTableName: "reviews",
				onDelete: "CASCADE",
				onUpdate: "CASCADE"
		}));

		await queryRunner.createForeignKey(
			"drivers",       
			new TableForeignKey({
				columnNames: ["vehicleId"],
				referencedColumnNames: ["id"],
				referencedTableName: "vehicles",
				onDelete: "CASCADE",
				onUpdate: "CASCADE"
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.dropForeignKey("drivers", "FK_vehicles_drivers");
		queryRunner.dropForeignKey("drivers", "FK_reviews_drivers");
		queryRunner.dropTable("drivers");
	}

}
