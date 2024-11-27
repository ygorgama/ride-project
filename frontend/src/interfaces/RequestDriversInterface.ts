interface driver { 
    id: number,
    name: string,
    value: number,
    description: number,
    review: {
        raiting: number,
        comment: string
    }
    vehicle: string
}

export interface RequestDriversInterface{
    origin: {
        latitude: number,
        longitude: number,
    },
    destination: {
        latitude: number,
        longitude: number,
    }
    distance: string,
    duration: string,
    options: driver[];
    routeResponse: [
        {
            legs: [
                {
                    startLocation: {
                        latLng: {
                            latitude:  number,
                            longitude: number
                        }
                    }
                    endLocation: {
                        latLng: {
                            latitude:  number,
                            longitude: number
                        }
                    }
                }
            ]
            distanceMeters: number;
            duration: string
        }
    ]
}

export interface DriverEntityInterface {
    id: number,
    name: string,
}