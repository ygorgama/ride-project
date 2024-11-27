import axios  from 'axios';
import { FormEvent, useEffect, useRef, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router";
import { RequestRidersInterface } from "../interfaces/RequestRidersInterface";
import Input from "../components/Input";
import { DriverEntityInterface } from "../interfaces/RequestDriversInterface";
import { AxiosError } from '../../node_modules/axios';

export default function TravellingHistory(){
    const {id} = useParams();
    const [searchParams] = useSearchParams();
    const driverParam = searchParams.get('driver_id');
    const [travelHistory, setTravelHistory] = useState<RequestRidersInterface[]>([]);
    const [drivers, setDrivers] = useState<DriverEntityInterface[]>([]);
    const customerIdRef = useRef<HTMLInputElement>(null);
    const driverIdRef = useRef<HTMLSelectElement>(null);
    const [errorId, setErrorId] = useState(false);
    const [errorDriver, setErrorDriver] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const travelHistoryTableHeaders = ["data e hora da viagem", "nome do motorista", 
        "origem", "destino", "distância", "tempo", "valor"
    ];

    const formSubmit = (event: FormEvent) => {
        event.preventDefault()

        const driver = (driverIdRef.current && parseInt(driverIdRef.current.value) !== 0 ) ? `?driver_id=${driverIdRef.current.value}` : ""

        if (!customerIdRef.current || customerIdRef.current.value == "") {
            setErrorId(true);
            setErrorMessage("ID de consumidor inválido");
            return;
        }

        return navigate(`/travel-history/${customerIdRef.current?.value}${driver}`);
    }

    useEffect( () => {
        const driverIdParamFilter = driverParam ? `?driver_id=${driverParam}` : '';
        axios.get(`http://127.0.0.1:8080/ride/${id}${driverIdParamFilter}`)
        .then(response => {
            if (response.status == 404) {
                return;
            }
            return response.data
        })
        .then(responseData => setTravelHistory(responseData as Array<RequestRidersInterface>))
        .catch((err: Error | AxiosError) => {
            if (err instanceof AxiosError) {
                if (err.status == 404) {
                    setErrorId(true);
                }else{
                    setErrorDriver(true);
                }
            }
        });

        axios.get(`http://127.0.0.1:8080/driver/index`).then(response => response.data)
        .then(responseData => setDrivers(responseData as Array<DriverEntityInterface>))
        .catch(error => {
            if (error instanceof AxiosError) {
                setErrorDriver(true);
            }
        });
    }, [driverParam, id, setTravelHistory]);


    return (
        <div className="mx-4">
            <div className="bg-gray-500 mt-4 p-6 rounded">
                <h2 className="mb-4">Filtros</h2>
                <form onSubmit={formSubmit} className='flex '>
                    <Input inputRef={customerIdRef} errorMessage={errorMessage} error={errorId} label="Custumer" inputType="text" name="custumer" placeholder="Zezinho"></Input>
                    <div className='ml-4'>
                        <label className="block mb-1 text-gray-600 font-semibold" htmlFor="">Motorista</label>
                        <select name="" ref={driverIdRef} className="w-full p-3 rounded text-gray-600 cursor-pointer  bg-slate-200" id="driver">
                            <option value={0}>-------------------------------</option>
                            {drivers.length > 0 && (
                                drivers.map(driver => (
                                    <option value={driver.id}>{driver.name}</option>
                                ))
                            )}
                        </select>
                        {errorDriver ? (<p className="text-red-600 ">{errorMessage}</p>) : ''}
                        </div>
                    <div className="ml-3 self-center">
                        <button type="submit" className="submit-button  font-semibold">Filtrar</button>
                    </div>
                </form>
            </div>
            <div className="mt-4 ">
                { (travelHistory.length > 0) && (
                        <table className="table-auto  min-w-full">
                            <thead>
                                <tr>
                                    {travelHistoryTableHeaders.map(header => (
                                        <th  className=" bg-slate-600  border-slate-500  border p-1">{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    travelHistory.map(history => (
                                        <tr key={history.id} className="text-center">
                                            <td className="border-slate-500 border   bg-slate-400">{history.date}</td>
                                            <td className="border-slate-500 border  bg-slate-400">{history.driver.name}</td>
                                            <td className="border-slate-500 border  bg-slate-400">{history.origin}</td>
                                            <td className="border-slate-500 border  bg-slate-400">{history.destination}</td>
                                            <td className="border-slate-500 border  bg-slate-400">{history.distance} KM</td>
                                            <td className="border-slate-500 border  bg-slate-400">{history.duration} KM</td>
                                            <td className="border-slate-500 border  bg-slate-400">{history.value} KM</td>


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