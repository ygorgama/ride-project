import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class RideConfirmation1732490866605 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.createTable(
				new Table(
					{
						name: "ride_confirmation",
						columns: [
							{
								name: "id",
								type: "bigint",
								isPrimary: true,
								isGenerated: true,
								isNullable: false
							},
							{
								name: "driverId",
								type: "bigint",
								isNullable: false
							},
							{
								name: "costumerId",
								type: "varchar",
								isNullable: false
							},
							{
								name: "date",
								type: "timestamp",
								default: "now()",
							},
							{
								name: "origin",
								type: "varchar",
								isNullable: false
							},
							{
								name: "destination",
								type: "varchar",
								isNullable: false
							},
							{
								name: "distance",
								type: "numeric",
								isNullable: false
							},
							{
								name: "duration",
								type: "varchar",
								isNullable: false
							},
							{
								name: "value",
								type: "numeric",
								isNullable: false
							},
						]
					}
				)
			);

			await queryRunner.createForeignKey("ride_confirmation", 
				new TableForeignKey({
					columnNames: ["driverId"],
					referencedColumnNames: ["id"],
					referencedTableName: "drivers",
					onDelete: "CASCADE",
					onUpdate: "CASCADE"
				})
			);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
			queryRunner.dropForeignKey("ride_confirmation", "FK_drivers_ride_confirmation");
			queryRunner.dropTable("ride_confirmation");
    }

}
