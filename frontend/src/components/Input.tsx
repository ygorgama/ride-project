interface InputInterface {
    inputType: React.HTMLInputTypeAttribute 
    name: string,
    inputRef: React.RefObject<HTMLInputElement>
    label: string
    error: boolean
    errorMessage: string
    placeholder?: string
    className?: string
}


export default function Input({inputType, inputRef, label, name, error, errorMessage, placeholder, className}: InputInterface){
    return (
        <div className={"form-container " + className && className} >
            <label className="block mb-1 text-gray-600 font-semibold" htmlFor={name}>{label}</label>
            <input id={name} name={name} className="w-full p-3 rounded text-gray-600 bg-slate-200" type={inputType} ref={inputRef} placeholder={placeholder ? placeholder : ''}/>
            {error ? (<p className="text-red-600 mt-2">{errorMessage}</p>) : ''}
        </div>
    )
} 