interface InputInterface {
    inputType: React.HTMLInputTypeAttribute 
    name: string,
    inputRef: React.RefObject<HTMLInputElement>
    label: string
    placeholder?: string
}


export default function Input({inputType, inputRef, label, placeholder, name}: InputInterface){
    return (
        <div className="form-container mb-3">
            <label className="block mb-1 text-gray-600 font-semibold" htmlFor={name}>{label}</label>
            <input id={name} name={name} className="w-full p-3 rounded text-gray-600 bg-slate-200" type={inputType} ref={inputRef} placeholder={placeholder ? placeholder : ''}/>
        </div>
    )
} 