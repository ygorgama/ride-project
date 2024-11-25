import app from "./app";
import { AppDataSource } from "./data-source";
import dotenv from 'dotenv';

dotenv.config({path: "../.env"})

const PORT:number = 8080;

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
		app.listen(PORT, () => {
			console.log(`Back-end listening on PORT ${PORT}`);
		})
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

