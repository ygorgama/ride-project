import "reflect-metadata"
import { DataSource } from "typeorm"


export const AppDataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "main",
  password: "1234",
  database: "application",
  logging: true,
	entities: [__dirname + "/entities/*.{js,ts}"],
  migrations: [__dirname + "/database/migrations/*.{js,ts}"],
	subscribers: [],
})
