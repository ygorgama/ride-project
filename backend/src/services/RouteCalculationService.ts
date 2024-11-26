import axios from "axios";
import { RouteCalculationServiceInterface, routeCalculationType, routeObjects } from "./interface/RouteCalculationInterface";

export class RouteCalculationService implements RouteCalculationServiceInterface{
	async calculateRoute(origin: string, destination: string) : Promise<[routeObjects]> {

		const headers = {
			'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
			'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration,routes.legs.startLocation,routes.legs.endLocation'
		}

		console.log(headers)

		const requestBody = {
			origin: {
				address: origin
			},
			destination: {
				address: destination
			},
			travelMode: "DRIVE",
			computeAlternativeRoutes: false
		}

		const response = await axios.post("https://routes.googleapis.com/directions/v2:computeRoutes", requestBody, {
			headers: headers
		});

		if (response.status !== 200) {
			throw new Error("One or both of the routes are invalid", {cause: "Invalid route"});
		}

		const responseData= await response.data as routeCalculationType ;

		if (!responseData.routes) {
			throw new Error("One or both of the routes are invalid", {cause: "Invalid route"});
		}

		if (
			responseData.routes[0].legs[0].startLocation.latLng.latitude === responseData.routes[0].legs[0].endLocation.latLng.latitude &&
			responseData.routes[0].legs[0].startLocation.latLng.longitude === responseData.routes[0].legs[0].endLocation.latLng.longitude
		) {
			throw new Error("Input Error: origin and destination needs to be different", {cause: "Invalid route"});
		}

		return responseData.routes
	}
		

}
