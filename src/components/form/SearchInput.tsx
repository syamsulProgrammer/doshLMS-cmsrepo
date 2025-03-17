import { useRef, useState } from "react";
import { Search, X } from "react-feather";

const SearchInput = (props:any) => {
    const [typed, setTyped] = useState("")
    const inputField = useRef<HTMLInputElement>(null)

    return (
        <div className="relative flex gap-2">
            <Search className="absolute top-2 left-2" />
            <input 
                onSubmit={()=>{
                    props.form.setFieldValue(props.field.name, typed)
                    props.form.handleSubmit()
                }}
                ref={inputField} type="text" value={typed} onChange={(e)=>{
                    props.field.onChange(e)
                    props.form.setFieldValue(props.field.name, e.target.value)
                    setTyped(e.target.value)
                }} name={props.field.name} placeholder={props.placeholder} className="pl-10 rounded w-full focus:bg-white focus:ring-0 focus:ring-offset-0 focus:outline-none" />
            <button type="button" disabled={typed === "" ? true : false} className={`bg-danger text-white rounded-lg p-2 ${typed == "" ? 'hidden' : "block"}`} onClick={()=>{
                setTyped("")
                props.form.setFieldValue(props.field.name, "")
                props.form.handleSubmit()
            }}>
                Clear
            </button>
        </div>
    );
 
};


export default SearchInput