import apiService from "@/apiService";
import { numberOnly, toBase64 } from "@/helpers/string";
import axios from "axios";
import { Field, Form, Formik, FormikProps } from "formik"
import Image from "next/image";
import React, { createRef, useEffect, useRef, useState } from "react";
import * as Yup from 'yup';
import defaultPhotoProfile from "@/assets/images/photo-placeholder.jpg"
import { getApiUrl } from "@/helpers/urls";
import { Eye, EyeOff } from "react-feather";

interface Props{
    show: boolean,
    userId: string,
    data: {
        id: string,
        username:string,
        email: string,
        fullName: string,
        workerId: string,
        password: string,
        photo: string
    }
    onClose():void
}

const ModalEditUser = (props: Props)=>{
    const formikRef = useRef<FormikProps<Record<string, unknown>>>(null);
    const [photoSrc, setPhotoSrc] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [photoBase64, setPhotoBase64] = useState("")
    const refFieldPhoto = createRef<HTMLInputElement>()
    // refFieldPhoto: React.RefObject<HTMLInputElement> = React.createRef();
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
        workerId: Yup.string().nullable().notRequired()
     
      });
    useEffect(()=>{
        formikRef.current?.setValues({
            username: props.data.username,
            name: props.data.fullName,
            email: props.data.email,
            workerId: props.data.workerId,
            photo: props.data.photo
        })
    }, [props])
    return(
        <div className={`${props.show ? 'block' : 'hidden'} fixed top-0 left-0 bottom-0 bg-black/25 w-full h-full p-3 justify-center flex items-center`}>
            
            <div className="w-1/3 bg-white p-8 rounded max-h-[90vh] overflow-scroll scrollbar-none">
                <div className="flex justify-center mb-3">
                    <h2 className="font-bold text-2xl">Edit User</h2>
                    {/* <button
                        onClick={()=>props.onClose()}
                    >
                        <X />
                    </button> */}
                </div>
                <Formik
                    innerRef={formikRef}
                    // innerRef={formikRef}
                    initialValues={{
                        username: '',
                        name: '',
                        email: '',
                        workerId: '',
                        password: '',
                        photo: ''
                    }}
                    onSubmit={(values, {setSubmitting, resetForm})=>{
                        // console.log("submit")
                        console.log(values, "values")
                        apiService.users.editUserById(props.userId, {
                            fullName: values.name,
                            username: values.username,
                            email: values.email,
                            workerId: values.workerId,
                            password: values.password,
                            confirmPassword: values.password,
                            photo: values.photo
                        }).then(data=>{
                            // setPhotoBase64("")
                            resetForm()
                            setPhotoSrc("")
                            setSubmitting(false)
                            props.onClose()
                        }).catch(err=>{
                            // console.log(err)
                        })
                        resetForm()
                    }}
                    validationSchema={AddUserSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        resetForm,
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
                                    <label htmlFor="email" className="w-full font-bold">E-Mail *</label>
                                    <Field 
                                        className={`w-full rounded-lg focus:bg-white ${values.email != '' ? 'bg-white' : 'bg-gray-200'}`}
                                        type="text" name="email" id="email" value={values.email} placeholder="Email"/>
                                    {errors.email && touched.email ? (
                                        <div className="text-xs text-danger">{errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="workerId" className="w-full font-bold">Worker ID</label>
                                    <Field 
                                        className={`w-full rounded-lg focus:bg-white ${values.workerId != '' ? 'bg-white' : 'bg-gray-200'}`}
                                        type="text" name="workerId" id="phone" value={values.workerId} placeholder="Worker ID"
                                        onChange={(e:any)=>{setFieldValue('workerId', e.target.value, false)}}   
                                    />
                                    {errors.phone && touched.phone ? (
                                        <div className="text-xs text-danger">{errors.phone}</div>
                                    ) : null}
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="password" className="w-full font-bold">Password</label>
                                    <div className="input-group relative flex justify-between items-center">
                                        <Field 
                                            className={`w-full rounded-lg focus:bg-white ${values.password != '' ? 'bg-white' : 'bg-gray-200'}`}
                                            type={showPassword ? "text" : 'password'} name="password" id="password" value={values.password} placeholder="Password" />
                                        
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
                                    
                                    <div id="previewPhoto" className="flex justify-center" onClick={()=>{
                                        if (refFieldPhoto.current) {
                                            // console.log(refFieldPhoto)
                                            // refFieldPhoto.current.click()
                                        }
                                    }}>
                                        <div className="w-1/2 border-2 cursor-pointer">
                                        {photoSrc == "" ? (
                                            <Image src={props.data.photo ? getApiUrl()+props.data.photo : defaultPhotoProfile} alt="Placeholder default profile" width={300} height={300} onClick={()=>{
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
                                            resetForm()
                                            props.onClose()
                                        }}
                                        className="bg-gray-200 p-3 rounded w-full text-[#808080] font-bold"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-primary p-3 w-full rounded text-white font-bold"
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
            </div>
        </div>
    )
}

export default ModalEditUser