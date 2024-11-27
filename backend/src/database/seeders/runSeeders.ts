import { AppDataSource } from "../../data-source"; // Your TypeORM DataSource instance
import { seedDriverrs } from "./driverSeeders";

type driverType = []

export async function runSeeders() {
  try {
    // Initialize Data Source
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");

		const drivers: driverType = await AppDataSource.query("SELECT * FROM drivers");
	
		if (drivers.length > 0) {
			console.log("DRIVERS ALREADY HAS ELEMENTS ON DATABASE")
			await AppDataSource.destroy();
			console.log("Data Source has been destroyed.");
			return; 
		}
    
		// Run seeders
		for (let index = 1; index <= 10; index++) {
			await seedDriverrs(AppDataSource, index);
		}
		
    // Close the connection
    await AppDataSource.destroy();
    console.log("Data Source has been destroyed.");
  } catch (error) {
    console.error("Error running seeders:", error);
  }
}


runSeeders();
