export interface RequestRidersInterface {
    costumerId: string;
    date: string;
    destination: string;
    distance: string;
    duration: string;
    origin: string;
    id: number;
    driver: {
        name: string;
        id: number;
    }  
    value: number;
}