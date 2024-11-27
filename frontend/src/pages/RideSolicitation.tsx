import { FormEvent, useRef, useState } from "react"
import Input from "../components/Input";
import axios from "axios";
import { RequestDriversInterface } from "../interfaces/RequestDriversInterface";
import { useAppContext } from "../provider";
import { useNavigate } from "react-router";
import { AxiosError } from '../../node_modules/axios';

export default function RideSolicitation(){
    const { setDrivers, setCustumerId, setLocation } = useAppContext();
    const navigate = useNavigate();

    const formRef = useRef<HTMLFormElement>(null)
    const inputCustomerId= useRef<HTMLInputElement>(null);

    const inputOrigin = useRef<HTMLInputElement>(null);

    const inputDestination = useRef<HTMLInputElement>(null);

    const [errorCustumerId, setErrorCustumerId] = useState(false);
    const [errorOrigin, setErrorOrigin] = useState(false);
    const [errorDestination, setErrorDestination] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();

        const requestBody = {
            customer_id: inputCustomerId.current?.value,
            destination: inputDestination.current?.value,
            origin: inputOrigin.current?.value,
        }

        if (!requestBody.customer_id || requestBody.customer_id == "") {
            setErrorCustumerId(true);
            setErrorMessage("ID do cunsumido inválido")
        }else{
            setErrorCustumerId(false);  
        }

        if (!requestBody.origin || requestBody.origin == "" || requestBody.origin == requestBody.destination) {
            setErrorOrigin(true);
        }else{
            setErrorOrigin(false)
        }

        if (!requestBody.destination || requestBody.destination == "" || requestBody.destination == requestBody.destination) {
            setErrorDestination(true);
        }else{
            setErrorDestination(false)
        }


        try {
            const response = await axios.post("http://127.0.0.1:8080/ride/estimate", requestBody);
            const responseData: RequestDriversInterface = response.data as RequestDriversInterface
            if (requestBody.customer_id) {
                setCustumerId(requestBody.customer_id);
            }
            setDrivers(responseData);
            if (
                requestBody.destination &&
                requestBody.origin
            ) {
                setLocation({
                    destination: requestBody.destination as string,
                    origin: requestBody.origin as string,
                });
            }
            return  navigate("/traveling-options");
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(AxiosError)
            }
        }

        formRef.current?.reset();
    }
    
    return (
        <div className="flex justify-center items-center w-full h-screen">
            <form onSubmit={submitHandler} ref={formRef} className="w-96 bg-gray-400 rounded p-4">
                <Input errorMessage={errorMessage} error={errorCustumerId} inputRef={inputCustomerId}  label="Custumer ID" name="custumer" inputType="text" placeholder="Custumer ID" />
                <Input errorMessage={errorMessage} error={errorOrigin}  inputRef={inputOrigin} label="Origin" name="origin" inputType="text" placeholder="Feira de Santana BA" />
                <Input inputRef={inputDestination} errorMessage={errorMessage} error={errorDestination}  label="Destination" name="destination" inputType="text" placeholder="Salvador BA"/>
                <div>
                    <button className="submit-button w-full">Submit</button>
                </div>
            </form>

        </div>
    )
}