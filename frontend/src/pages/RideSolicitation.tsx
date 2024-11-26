import { FormEvent, useRef } from "react"
import Input from "../components/Input";

export default function RideSolicitation(){
    const formRef = useRef<HTMLFormElement>(null)
    const inputCustomerId= useRef<HTMLInputElement>(null);
    const inputOrigin = useRef<HTMLInputElement>(null);;
    const inputDestination = useRef<HTMLInputElement>(null);;

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();
        console.log(inputCustomerId.current?.value)
        console.log(inputOrigin.current?.value)
        console.log(inputDestination.current?.value)

        formRef.current?.reset();
    }
    
    return (
        <div className="flex justify-center items-center w-full h-screen">
            <form onSubmit={submitHandler} ref={formRef} className="w-96 ">
                <Input inputRef={inputCustomerId}  label="Custumer ID" name="custumer" inputType="text" placeholder="Custumer ID"/>
                <Input inputRef={inputCustomerId}  label="Origin" name="origin" inputType="text" placeholder="Feira de Santana BA"/>
                <Input inputRef={inputCustomerId}  label="Destination" name="destination" inputType="text" placeholder="Salvador BA"/>
                <div>
                    <button className="submit-button w-full">Submit</button>
                </div>
            </form>
        </div>
    )
}