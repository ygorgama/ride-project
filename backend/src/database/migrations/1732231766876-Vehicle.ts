import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Vehicle1732231766876 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
			queryRunner.createTable(
				new Table(
					{
						name: "vehicles",
						columns: [
							{
								name: "id",
								type: "bigint",
								isPrimary: true,
								isGenerated: true,
								isNullable: false
							},
							{
								name: "model",
								type: "varchar",
								isNullable: false
							},
							{
								name: "description",
								type: "text",
								isNullable: false
							}
						]
					}
				)
			)
		}

    public async down(queryRunner: QueryRunner): Promise<void> {
			queryRunner.dropTable("vehicles", true, true);
    }

}


