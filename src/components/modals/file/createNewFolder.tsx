import axios from "axios"
import { Form, Formik } from "formik"
import { X } from "react-feather"

interface Props{
    show:boolean,
    onClose():void,
    handleSubmit(name:string):void
}

const ModalCreateNewFolder = (props:Props)=>{
    // console.log(props, "props")
    return(
        <div onClick={()=>{
            // props.onClose()
        }} className={`${props.show == true ? 'block' : 'hidden'} fixed top-0 left-0 bottom-0 bg-black/25 w-full h-full p-3 justify-center flex items-center`}>
            <div className="bg-white w-1/3 p-3 rounded-lg">
                <div className="flex justify-between">
                    <h3 className="font-bold text-lg">New Folder</h3>
                    <button onClick={()=>props.onClose()}><X /></button>
                </div>
                <div>
                    <Formik
                        initialValues={{
                            name: ''
                        }}
                        onSubmit={(values)=>{
                            console.log("submitted")
                            props.handleSubmit(values.name)
                            // console.log('submitted')
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,           
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        })=>(
                            <Form>
                            <div>
                                <input className="w-full rounded" type="text" name="name" value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <div className="pt-3 flex justify-end gap-3">
                                    <div className="flex justify-between gap-3 w-full">
                                        <button
                                            className="bg-gray-200 p-3 rounded w-full text-[#808080] font-bold"
                                            type="button"
                                            onClick={()=>props.onClose()}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="bg-primary p-3 rounded w-full text-white font-bold"
                                            type="submit"
                                        >
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}


export default ModalCreateNewFolder