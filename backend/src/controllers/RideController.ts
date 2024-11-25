import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { RouteCalculationServiceInterface } from "../services/interface/RouteCalculationInterface"; 
import { AppDataSource } from "../data-source";
import { Drivers } from "../entities/DriversEntity";
import { RideConfirmation } from "../entities/RideConfirmationEntity";

export class RideController {

	constructor(
		// eslint-disable-next-line no-unused-vars
		private readonly _routeCalculation: RouteCalculationServiceInterface,
	){}

	async estimateRoute(req: Request, res: Response){
		const {
			origin,
			destination
		} = req.body;

		const result = validationResult(req);

		if (!result.isEmpty()) {
			return res.status(400).json({
				"error_code": "INVALID_DATA",
				"error_description": result.array()[0].msg
			});
		}
		
		try {
			const routeValues = 	await this._routeCalculation.calculateRoute(origin, destination);
			const distanceOnKm = (routeValues[0].distanceMeters * 0.001).toFixed(0);

			const driverRepository = AppDataSource.getRepository(Drivers);

			const drivers = await driverRepository.createQueryBuilder("drivers")
			.where("drivers.minimal_km <= :km", {km: distanceOnKm})
			.innerJoinAndSelect("drivers.vehicle", "vehicle")
			.innerJoinAndSelect("drivers.review", "review")
			.select([
				"drivers.id",
				"drivers.name",
				"drivers.description",
				"vehicle.model",
				"vehicle.description",
				"review.raiting",
				"review.comment",
				"drivers.value",
			])
			.orderBy("drivers.value", "DESC")
			.getMany();

			const driversEditet = drivers.map(driver => {
				if (driver.vehicle != null || driver.vehicle != undefined) {
					const vehicle = driver.vehicle.model + " " + driver.vehicle.description;
					delete driver.vehicle;
					driver.vehicle = vehicle; 
				}

				return driver
			});

			const expectedResponse = {
				origin: {
					latitude: routeValues[0].legs[0].startLocation.latLng.latitude,
					longitude: routeValues[0].legs[0].startLocation.latLng.longitude
				},
				destination: {
					latitude: routeValues[0].legs[0].endLocation.latLng.latitude,
					longitude: routeValues[0].legs[0].endLocation.latLng.longitude
				},
				distance: distanceOnKm,
				duration:  routeValues[0].duration,
				options: [...driversEditet],
				routeResponse: routeValues
			} 

			return res.status(200).json(expectedResponse);
		} catch (error: unknown) {
			if (error instanceof Error ) {
					if (error.cause == "Invalid route") {
						return res.status(400).json({
								"error_code": "INVALID_DATA",
								"error_description": error.message
						});
					}
		
					return res.status(500).json({
						"error_code": "UNEXPECTED_ERROR",
						"error_description": error.message
					});
			} 
		}
	}

	public async confirmRide(req: Request, res: Response){
		const {
			customer_id, origin, destination, 
			distance, duration,
			driver,
			value
		} = req.body;
		
		const result = validationResult(req);

		if (!result.isEmpty()) {
			return res.status(400).json({
				"error_code": "INVALID_DATA",
				"error_description": result.array()[0].msg
			});
		}

		try {
			const foundedDriver =  await AppDataSource.getRepository(Drivers).findOneBy({
				id: driver?.id
			})

			if (!foundedDriver) {
				throw new Error('Driver does not exist in the database', {cause: "DRIVER_NOT_FOUND"})
			}

			if (foundedDriver.minimal_km) {
				if (foundedDriver.minimal_km > distance) {
					throw new Error('Killometer on distance is less than this driver accept', {cause: "INVALID_DISTANCE"})
				}
			}

			const rideRepository = AppDataSource.getRepository(RideConfirmation);
			const newRide = new RideConfirmation();

			newRide.destination = destination;
			newRide.origin = origin;
			newRide.duration = duration;
			newRide.driver = driver;
			newRide.costumerId = customer_id;
			newRide.distance= distance;
			newRide.value = value;

			await rideRepository.save(newRide);

			return res.status(200).json({success: true});
		} catch (error) {
			if (error instanceof Error ) {
				const error_code = error.cause;
				let status = 500;

				if (error.cause === "DRIVER_NOT_FOUND") {
					status = 404;
				}else if(error.cause === "INVALID_DISTANCE"){
					status = 406;
				}
	
				return res.status(status).json({
					"error_code": error_code,
					"error_description": error.message
				});
		} 
		}
	}
}
