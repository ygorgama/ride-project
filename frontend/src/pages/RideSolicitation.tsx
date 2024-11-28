import { FormEvent, useRef, useState } from "react"
import Input from "../components/Input";
import axios from "axios";
import { RequestDriversInterface } from "../interfaces/RequestDriversInterface";
import { useAppContext } from "../provider";
import { useNavigate } from "react-router";
import  { AxiosError } from '../../node_modules/axios';
import ErrorBox from "../components/ErrorBox";
import { ErrorRequestInterface } from "../interfaces/ErrorRequestInterface";

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
    const [apiError, setApiError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [apiErrorMessage, setApiErrorMessage] = useState("");

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
            return;
        }else{
            setErrorCustumerId(false);  
        }

        if (!requestBody.origin || requestBody.origin == "" || requestBody.origin == requestBody.destination) {
            setErrorOrigin(true);
            setErrorMessage("Origem invalida")
            return;
        }else{
            setErrorOrigin(false)
        }

        if (!requestBody.destination || requestBody.destination == "" || requestBody.destination == requestBody.origin) {
            setErrorDestination(true);
            setErrorMessage("Destino invalido")
            return;
        }else{
            setErrorDestination(false)
        }


        try {
            const response = await axios.post("http://127.0.0.1:8080/ride/estimate", requestBody);

            if (response.status !== 200) {
                console.log("Hi")
                return;
            }

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

            setApiError(false);
            formRef.current?.reset();
            return  navigate("/traveling-options");
        } catch (err: unknown) {
            if (err instanceof Error) {
                if (err.name == "AxiosError") {
                    const error = err as AxiosError;
                    const errorRerquest:ErrorRequestInterface = error.response?.data as ErrorRequestInterface;
                    setApiError(true);
                    setApiErrorMessage(errorRerquest.error_description);
                    return
                }
 
            }
        }

    }
    
    return (
        <div className="flex justify-center items-center w-full h-screen flex-col">
            {
                apiError && <ErrorBox  errorMessage={apiErrorMessage}></ErrorBox>
                
            }
            <form onSubmit={submitHandler} ref={formRef} className="w-96 bg-gray-400 rounded p-4">
                <Input className="mb-4" errorMessage={errorMessage} error={errorCustumerId} inputRef={inputCustomerId}  label="Custumer ID" name="custumer" inputType="text" placeholder="Custumer ID" />
                <Input className="mb-4" errorMessage={errorMessage} error={errorOrigin}  inputRef={inputOrigin} label="Origin" name="origin" inputType="text" placeholder="Feira de Santana BA" />
                <Input className="mb-4" inputRef={inputDestination} errorMessage={errorMessage} error={errorDestination}  label="Destination" name="destination" inputType="text" placeholder="Salvador BA"/>
                <div>
                    <button className="submit-button w-full cursor-pointer">Submit</button>
                </div>
            </form>

        </div>
    )
}