import apiService from "@/apiService";
import { numberOnly, toBase64 } from "@/helpers/string";
import axios from "axios"
import { Field, Form, Formik } from "formik"
import { createRef, useEffect, useState } from "react";
import { X } from "react-feather"
import * as Yup from 'yup';
import defaultPhotoProfile from "@/assets/images/photo-placeholder.jpg"
import Image from "next/image";
import { getCookie, setCookie } from "cookies-next";
import { getApiUrl } from "@/helpers/urls";

interface Props{
    show: boolean,
    onClose(): void
  }

const ModalEditPhoto = (props: Props)=>{
    const [sessionUser, setSessionUser] = useState(JSON.parse(getCookie("session_user") || "{}"))
    const [photoSrc, setPhotoSrc] = useState(sessionUser.photo)
    // const [photoBase64, setPhotoBase64] = useState("")
    // console.log(sessionUser)
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
            .notRequired()
        //   .min(8, 'Too Short!')
        //   .max(50, 'Too Long!')
        //   .required('Required')
      });
    useEffect(()=>{

    }, [props, photoSrc])
    return(
        <div className={`${props.show ? 'block' : 'hidden'} fixed top-0 left-0 bottom-0 bg-black/25 w-full h-full p-3 justify-center flex items-center z-50`}>
            <div className="w-1/3 bg-white p-8 rounded">
                <div className="flex justify-center mb-3">
                    <h2 className="font-bold text-2xl">Edit Photo</h2>
                    {/* <button
                        onClick={()=>props.onClose()}
                    >
                        <X />
                    </button> */}
                </div>
                <Formik
                    initialValues={{
                        file: ''
                    }}
                    onSubmit={(values, {setSubmitting, resetForm, setErrors})=>{
                        let formData = new FormData()
                        formData.append("file", values.file)
                        apiService.profile.updatePhotoDirect(formData).then(data=>{
                            setPhotoSrc(getApiUrl()+data.data.images_url)
                            apiService.auth.checkToken(getCookie("token") || "").then(()=>{

                            }).catch(err=>{

                            })
                            // apiService.auth.checkToken(getCookie("token") || "").then(()=>{
                            //     setSubmitting(false)
                            //     // setPhotoSrc("")
                            //     props.onClose()
                            // })
                            setSubmitting(false)
                                // setPhotoSrc("")
                            props.onClose()


                        }).catch(err=>{
                            console.log(err)
                            setSubmitting(false)
                            // setPhotoSrc("")
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
                                <div className="preview-photo border-2 rounded flex justify-center mb-5 relative aspect-square cursor-pointer">
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
                                                setFieldValue("file", e.target.files[0])                                                
                                            }

                                    }} />
                                    {photoSrc != null ? (
                                        <Image src={getApiUrl()+photoSrc} alt="Preview Image" layout="contain" objectFit="cover" width={800} height={800} onClick={()=>{
                                            if (refFieldPhoto.current) {
                                                refFieldPhoto.current.click()
                                            }
                                        }}/>
                                    ) : (
                                        <Image src={defaultPhotoProfile} alt="Placeholder default profile" className="w-full" layout="contain" objectFit="cover" onClick={()=>{
                                            if (refFieldPhoto.current) {
                                                refFieldPhoto.current.click()
                                            }
                                        }}/>
                                    )}
                                </div>
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
                                        onClick={()=>{}}
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

export default ModalEditPhoto