interface ErrorBoxInterface {
    errorMessage: string
}

export default function ErrorBox({errorMessage }:ErrorBoxInterface){
    return (
        <div className={"bg-red-400 flex justify-center items-center w-96 rounded text-white font-bold p-6 mb-7 "}>
            <div>
                <p>
                    {errorMessage}
                </p>
            </div>
        </div>
    )
}