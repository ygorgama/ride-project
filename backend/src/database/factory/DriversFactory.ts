import { setSeederFactory } from "typeorm-extension";
import { Drivers } from "../../entities/DriversEntity";
import { faker } from "@faker-js/faker";

export const DriversFactory = setSeederFactory(Drivers, () => {
	const driver = new Drivers();
	driver.name = faker.person.fullName();
	driver.tax = faker.number.float();
	driver.minimal_km = faker.number.int({min: 1, max: 10});
	return driver;
}); 
