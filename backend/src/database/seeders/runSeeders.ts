import { AppDataSource } from "../../data-source"; // Your TypeORM DataSource instance
import { seedDriverrs } from "./driverSeeders";

export async function runSeeders() {
  try {
    // Initialize Data Source
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
    // Run seeders
    await seedDriverrs(AppDataSource, 1);
		
    // Close the connection
    await AppDataSource.destroy();
    console.log("Data Source has been destroyed.");
  } catch (error) {
    console.error("Error running seeders:", error);
  }
}


runSeeders();
