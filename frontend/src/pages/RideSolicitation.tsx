import { FormEvent, useRef, useState } from "react"
import Input from "../components/Input";
import axios from "axios";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

interface GoogleMapsLatLongInterface {
    latitude: number;
    longitude: number;
}

export default function RideSolicitation(){
    const [originLatLong, setOriginLatLong] = useState<google.maps.LatLngLiteral>();
    const [destinationLatLong,setDestinationLatLong] = useState<google.maps.LatLngLiteral>()

    const formRef = useRef<HTMLFormElement>(null)
    const inputCustomerId= useRef<HTMLInputElement>(null);

    const inputOrigin = useRef<HTMLInputElement>(null);

    const inputDestination = useRef<HTMLInputElement>(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.GOOGLE_API_KEY as string,
    })


    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();

        const requestBody = {
            customer_id: inputCustomerId.current?.value,
            destination: inputDestination.current?.value,
            origin: inputOrigin.current?.value,
        }

        console.log(requestBody)

        try {
            const responseData = await axios.post("http://127.0.0.1:8080/ride/estimate", requestBody);

            if (responseData.status !== 200) {
                console.log()
            }
            console.log(responseData.data)
    
        } catch (error) {
            console.log(error)
        }

        formRef.current?.reset();
    }
    
    return (
        <div className="flex justify-center items-center w-full h-screen">
            <form onSubmit={submitHandler} ref={formRef} className="w-96 ">
                <Input inputRef={inputCustomerId}  label="Custumer ID" name="custumer" inputType="text" placeholder="Custumer ID" />
                <Input inputRef={inputOrigin}   label="Origin" name="origin" inputType="text" placeholder="Feira de Santana BA" />
                <Input inputRef={inputDestination}   label="Destination" name="destination" inputType="text" placeholder="Salvador BA"/>
                <div>
                    <button className="submit-button w-full">Submit</button>
                </div>
            </form>
        </div>
    )
}