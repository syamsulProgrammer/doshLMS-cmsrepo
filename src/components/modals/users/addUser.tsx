import apiService from "@/apiService";
import { numberOnly, toBase64 } from "@/helpers/string";
import axios from "axios"
import { Field, Form, Formik } from "formik"
import { createRef, useState } from "react";
import { Eye, EyeOff, X } from "react-feather"
import * as Yup from 'yup';
import defaultPhotoProfile from "@/assets/images/photo-placeholder.jpg"
import Image from "next/image";

const ModalAddUser = (props: any)=>{
    const [photoSrc, setPhotoSrc] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [photoBase64, setPhotoBase64] = useState("")
    const refFieldPhoto = createRef<HTMLInputElement>()
    const AddUserSchema = Yup.object().shape({
        username: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        name: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        phone: Yup.string().nullable().notRequired(),
        password: Yup.string()
          .min(5, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required')
      });
    return(
        <div className={`${props.show ? 'block' : 'hidden'} fixed top-0 left-0 bottom-0 bg-black/25 w-full h-full p-3 justify-center flex items-center`}>
            <div className="w-1/3 bg-white p-8 rounded max-h-[90vh] overflow-scroll scrollbar-none">
                <div className="flex justify-center mb-3">
                    <h2 className="font-bold text-2xl">Create User</h2>
                    {/* <button
                        onClick={()=>props.onClose()}
                    >
                        <X />
                    </button> */}
                </div>
                <Formik
                    initialValues={{
                        username: '',
                        name: '',
                        email: '',
                        workerId: '',
                        password: '',
                        photo: ''
                    }}
                    onSubmit={(values, {setSubmitting, resetForm, setErrors})=>{
                        // console.log("submit")
                        console.log(values)
                        apiService.users.addUser({
                            fullName: values.name,
                            username: values.username,
                            email: values.email,
                            workerId: values.workerId,
                            password: values.password,
                            confirmPassword: values.password,
                            photo: values.photo
                        }).then(data=>{
                            setSubmitting(false)
                            setPhotoSrc("")
                            resetForm()
                            props.onClose()
                        }).catch(err=>{
                            setSubmitting(false)
                            setPhotoSrc("")
                            // props.onClose()
                        })
                        // axios.post('/api/user/add', {
                        //     fullName: values.name,
                        //     username: values.username,
                        //     email: values.email,
                        //     phoneNumber: values.phone,
                        //     password: values.password,
                        //     confirmPassword: values.password
                        // }).then(data=>{
                        //     setSubmitting(false)
                        //     props.onClose()
                        // }).catch(err=>{
                        //     console.log(err)
                        //     setSubmitting(false)
                        //     props.onClose()
                        // })
                        // resetForm()
                        // setErrors({})
                        // setTimeout(setErrors)
                    }}
                    validationSchema={AddUserSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        isSubmitting,
                        setFieldValue
                    })=>(
                        // return(
                            <Form>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="username" className="w-full font-bold">Username *</label>
                                    <Field
                                        className={`w-full rounded-lg focus:bg-white ${values.username != '' ? 'bg-white' : 'bg-gray-200'}`}
                                        type="text" name="username" id="" value={values.username} 
                                        placeholder="Username"
                                    />
                                    {errors.username && touched.username ? (
                                        <div className="text-xs text-danger">{errors.username}</div>
                                    ) : null}
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="firstName" className="w-full font-bold">Name *</label>
                                    <Field 
                                        name="name" type="text"
                                        className={`w-full rounded-lg focus:bg-white ${values.name != '' ? 'bg-white' : 'bg-gray-200'}`}
                                        placeholder="Name"
                                    />
                                    {errors.name && touched.name ? (
                                        <div className="text-xs text-danger">{errors.name}</div>
                                    ) : null}
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="email" className="w-full font-bold">Mail *</label>
                                    <Field 
                                        className={`w-full rounded-lg focus:bg-white ${values.email != '' ? 'bg-white' : 'bg-gray-200'}`}
                                        type="text" name="email" id="email" placeholder="Email"
                                        value={values.email}
                                    />
                                    {errors.email && touched.email ? (
                                        <div className="text-xs text-danger">{errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="workerId" className="w-full font-bold">Worker ID</label>
                                    <Field 
                                        className={`w-full rounded-lg focus:bg-white ${values.workerId != '' ? 'bg-white' : 'bg-gray-200'}`}
                                        type="text" name="workerId" id="workerId" placeholder="Worker ID"
                                        value={values.workerId}
                                        onChange={(e:any)=>{setFieldValue('workerId', e.target.value, false)}}    
                                    />
                                    {errors.workerId && touched.workerId ? (
                                        <div className="text-xs text-danger">{errors.workerId}</div>
                                    ) : null}
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="password" className="w-full font-bold">Password *</label>
                                    <div className="input-group relative flex justify-between items-center">
                                    <Field 
                                        className={`w-full rounded-lg focus:bg-white ${values.password != '' ? 'bg-white' : 'bg-gray-200'}`}
                                        type={showPassword ? "text" : "password"} name="password" id="password" value={values.password} placeholder="Password" />
                                    
                                        <div className="absolute right-3 cursor-pointer">
                                            {!showPassword ? (
                                                <Eye onClick={()=>{
                                                    setShowPassword(true)
                                                }}/>
                                            ) : (
                                                <EyeOff onClick={()=>{
                                                    setShowPassword(false)
                                                }}/>
                                            )}
                                        </div>
                                    </div>
                                    {errors.password && touched.password ? (
                                        <div className="text-xs text-danger">{errors.password}</div>
                                    ) : null}
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="profilePhoto" className="w-full font-bold">Photo</label>
                                    <input 
                                        ref={refFieldPhoto}
                                        className="hidden"
                                        accept="image/*"
                                        type="file" name="photo" onChange={async (e)=>{
                                            const [file]:any = e.target.files
                                            setPhotoSrc(URL.createObjectURL(file))
                                            const base64 = await toBase64(file)
                                            // setFieldValue("photo", base64)
                                            if (e.target.files) {
                                                setFieldValue("photo", e.target.files[0])                                                
                                            }

                                    }} />
                                    
                                    <div id="previewPhoto" className="flex justify-center cursor-pointer" onClick={()=>{
                                        if (refFieldPhoto.current) {
                                            console.log(refFieldPhoto)
                                            // refFieldPhoto.current.click()
                                        }
                                    }}>
                                    <div className="w-1/2 border-2">
                                        {photoSrc == "" ? (
                                            <Image src={defaultPhotoProfile} alt="Placeholder default profile" width={300} height={300} onClick={()=>{
                                                if (refFieldPhoto.current) {
                                                    refFieldPhoto.current.click()
                                                }
                                            }}/>
                                        ) : (
                                            <Image src={photoSrc} alt="Preview Image" className="aspect-square" layout="contain" objectFit="cover" width={360} height={360} onClick={()=>{
                                                if (refFieldPhoto.current) {
                                                    refFieldPhoto.current.click()
                                                }
                                            }}/>
                                        )}
                                    </div>
                                    </div>
                                </div>
                                {/* <div className="flex gap-2 mb-3">
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
                                </div> */}
                                <div className="flex justify-between gap-3">
                                    <button
                                        type="button"
                                        onClick={()=>{
                                            props.onClose()
                                        }}
                                        className="bg-gray-200 text-back font-bold p-3 rounded-lg w-1/2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-primary text-white font-bold p-3 rounded-lg w-1/2"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Save
                                    </button>
                                </div>
                            </Form>
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

export default ModalAddUser