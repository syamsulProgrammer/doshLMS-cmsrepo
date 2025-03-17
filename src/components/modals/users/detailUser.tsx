import { Formik } from "formik"
import { X } from "react-feather"

const ModalDetailUser = (props: any)=>{
    return(
        <div className={`${props.show ? 'block' : 'hidden'} absolute top-0 left-0 bottom-0 bg-black/25 w-full h-full p-3 justify-center flex items-center`}>
            
            <div className="w-2/3 bg-white p-3 rounded">
                <div className="flex justify-between mb-3">
                    <h2 className="font-bold">Detail User</h2>
                    <button
                        onClick={()=>props.onClose()}
                    >
                        <X />
                    </button>
                </div>
                <Formik
                    initialValues={{
                        firstName: ''
                    }}
                    onSubmit={(values, {setSubmitting})=>{
                        // console.log("submit")
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
                        // return(
                            <form onSubmit={handleSubmit}>
                                <div className="flex gap-2 mb-3">
                                    <div className="w-48 flex items-center">
                                        <label htmlFor="firstName">Name</label>
                                    </div>
                                    <div className="flex grow gap-2">
                                        <div className="w-1/2">
                                            <input className="rounded w-full" type="text" name="" id="" placeholder="Firstname" />
                                        </div>
                                        <div className="w-1/2">
                                            <input className="rounded w-full" type="text" name="" id="" placeholder="Lastname"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 mb-3">
                                    <div className="w-48 flex items-center">
                                        <label htmlFor="username">Username</label>
                                    </div>
                                    <div className="flex grow">
                                        <input className="w-full rounded" type="text" name="" id="" />
                                    </div>
                                </div>
                                <div className="flex gap-2 mb-3">
                                    <div className="w-48 flex items-center">
                                        <label htmlFor="role">Role</label>
                                    </div>
                                    <div className="flex grow">
                                        <select name="role" id="role" className="rounded w-full">
                                            <option value="admin">Admin</option>
                                            <option value="instructor">Instructor</option>
                                            <option value="user">User</option>
                                        </select>
                                        {/* <input className="w-full rounded" type="text" name="" id="" /> */}
                                    </div>
                                </div>
                                <div className="flex gap-2 mb-3">
                                    <div className="w-48 flex items-center">
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <div className="flex grow">
                                        <input className="w-full rounded" type="text" name="" id="email" />
                                    </div>
                                </div>
                                <div className="flex gap-2 mb-3">
                                    <div className="w-48 flex items-center">
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    <div className="flex grow">
                                        <input className="w-full rounded" type="password" name="" id="password" />
                                    </div>
                                </div>
                                <div className="flex gap-2 mb-3">
                                    <div className="w-48 flex items-center">
                                        <label htmlFor="gender">Gender</label>
                                    </div>
                                    <div className="flex grow gap-3">
                                        <div>
                                            <input className="rounded" type="radio" name="gender" id="radioMale" /> <label htmlFor="radioMale">Male</label>
                                        </div>
                                        <div>
                                            <input className="rounded" type="radio" name="gender" id="radioFemale" /> <label htmlFor="radioFemale">Female</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        onClick={()=>{
                                            props.onClose()
                                        }}
                                        className="bg-red-400 p-3 rounded w-48"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-blue-400 p-3 rounded w-48"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        // )
                    )}
                </Formik>
                <div>
                    {/* Pooo */}
                </div>
            </div>
        </div>
    )
}

export default ModalDetailUser