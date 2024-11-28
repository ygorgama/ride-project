import { Link, useNavigate } from "react-router";
import StaticMap from "../components/StaticMap";
import { useAppContext } from "../provider";
import {  FormEvent, useRef } from "react";
import axios from "axios";

export default function TravellingOption(){
    const {drivers, custumerId, location} = useAppContext();
    const inputDriverNameRef = useRef<HTMLInputElement>(null);
    const inputDriverIdRef = useRef<HTMLInputElement>(null);
    const inputDriverValueRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleChosenDriver = async (event: FormEvent) => {
        event.preventDefault()
        const requestBody = {
            customer_id: custumerId,
            destination: location.destination,
            distance: drivers ? parseInt(drivers.distance) : drivers,
            duration: drivers?.duration,
            driver: {
                id: inputDriverIdRef.current ? parseInt(inputDriverIdRef.current.value) : ``,
                name:inputDriverNameRef.current?.value
            },
            value: inputDriverIdRef.current ? parseFloat(inputDriverIdRef.current.value) : ``,
            origin: location.origin,
        }


        try {
            await axios.patch("http://127.0.0.1:8080/ride/confirm", requestBody);
            return navigate(`/travel-history/${custumerId}`);
        } catch (error) {
            console.log(error)
        }
    }
    const tableHeader =  ["Nome", "Descrição", "Veículo",  "Avaliação", "Valor da viagem", ""];
    return (
        <div className="">
            <div>
                <Link className="mt-3 ml-5 block text-slate-100" to="/">Retornar</Link>
            </div>
            <div className="flex justify-center mt-5">
                {drivers && 
                    <StaticMap
                        destiny={{lat: drivers.destination.latitude, lng: drivers.destination.longitude}} 
                        origin={{lat: drivers.origin.latitude, lng: drivers.origin.longitude}}
                        googleApiKey={process.env.GOOGLE_API_KEY as string}
                    >
                    </StaticMap>
                }
            </div>
            <div  className="mx-4   mt-5 overflow-auto">
                { (drivers && drivers.options.length > 0) && (
                    <table className="table-auto  min-w-full">
                        <thead>
                            <tr>
                                {tableHeader.map(header => (
                                    <th  className=" bg-slate-600  border-slate-500  border p-1">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                drivers.options.map(driver => (
                                    <tr key={driver.id} className="text-center">
                                        <td className="border-slate-500 border   bg-slate-400">{driver.name}</td>
                                        <td className="border-slate-500 border  bg-slate-400">{driver.description}</td>
                                        <td className="border-slate-500 border  bg-slate-400">{driver.vehicle}</td>
                                        <td className="border-slate-500 border  bg-slate-400">
                                            {driver.review.raiting}/5
                                            <br /> 
                                            {driver.review.comment}
                                        </td>
                                        <td className="border-slate-500 border bg-slate-400">
                                            {driver.value.toFixed(2)}/KM
                                        </td>
                                        <td className=" bg-slate-400 border border-slate-500 cursor-pointer">
                                            <form onSubmit={handleChosenDriver}>
                                                <input type="hidden" ref={inputDriverNameRef} value={driver.name}/>
                                                <input type="hidden" ref={inputDriverIdRef} value={driver.id}/>
                                                <input type="hidden" ref={inputDriverValueRef} value={driver.value}/>
                                                <button type="submit"  className="cursor-pointer bg-yellow-400 p-3 rounded ">Escolher</button>
                                            </form>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table> )
                }
 
            </div>
        </div>
    )
}