type latType = {
	latLng: {
		latitude: number,
		longitude: number
	}
}

type legsObject = {
	startLocation: latType
	endLocation: latType
}

export type routeObjects = {
	legs: [legsObject],
	distanceMeters: number,
	duration: string
}

export type routeCalculationType =  {
	routes: [routeObjects]  | undefined
} ;



export interface RouteCalculationServiceInterface {
	// eslint-disable-next-line no-unused-vars
	calculateRoute( origin: string,  destination: string): Promise<[routeObjects]>;

}
