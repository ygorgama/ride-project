import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";


export async function seedDriverrs(dataSource: DataSource, iterationCyclePosition: number){
	await dataSource.query(`
			INSERT INTO vehicles (
			model,
			description
		) VALUES ('${faker.vehicle.vehicle()}', '${faker.lorem.sentence()}');
	`);

	await dataSource.query(`INSERT INTO reviews (raiting, comment) VALUES ('${faker.number.int({min: 1, max: 5})}', '${faker.lorem.sentence()}')`,  
	);

	await dataSource.query(`INSERT INTO drivers (name, tax, minimal_km, "reviewId", "vehicleId", "description") VALUES 
		('${faker.person.fullName()}', '${faker.number.float({min: 1, max: 10})}', 
		'${faker.number.int({min: 1, max: 10})}', '${iterationCyclePosition}', '${iterationCyclePosition}', '${faker.lorem.paragraph()}');`
	);

}
