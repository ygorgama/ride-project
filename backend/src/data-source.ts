import "reflect-metadata"
import { DataSource } from "typeorm"


export const AppDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "main",
  password: "1234",
  database: "application",
  logging: true,
	entities: [__dirname + "/entities/*.ts"],
  migrations: [__dirname + "/database/migrations/*.ts"],
	subscribers: [],
})
