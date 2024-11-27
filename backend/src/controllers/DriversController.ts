import { AppDataSource } from "../data-source";
import { Drivers } from "../entities/DriversEntity";
import { Request, Response } from "express";

export class DriverController {
	async index(_req: Request, res: Response){
		const drivers = await AppDataSource.getRepository(Drivers).createQueryBuilder("drivers").getMany();
		return res.status(200).json(drivers);
	}
}
