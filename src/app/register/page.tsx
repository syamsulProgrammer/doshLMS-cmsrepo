'use client'
import apiService from "@/apiService";
import { numberOnly } from "@/helpers/string";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X } from "react-feather";
// import { useRouter } from "next/router";
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    phone: Yup.string().nullable().notRequired(),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(5, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    confirmPassword: Yup.string()
    .test('passwords-match', 'Passwords must match', function(value){
        return this.parent.password === value
    }),
    term_cond_aggree: Yup.boolean().oneOf([true],'Term and condition must be agree')
  },[
    ["phone","phone"]
  ]);

export default function Register() {
    const router = useRouter()
    return (
        <main className="login-layout login-page h-screen w-screen flex-row justify-center items-center">
        <div className="flex">
            <div className="relative flex justify-center grow min-h-screen flex flex-col items-center">
                <button className="absolute top-3 right-3 color-white"
                    onClick={()=>router.back()}
                >
                    <X fill="white" color="white" />
                </button>
                <div className="bg-white rounded-lg p-12 w-1/2">
                    <div>
                        <h1 className="text-4xl font-bold text-center mb-3">
                            Create Account
                        </h1>
                    </div>
                    <Formik
                        initialValues={{
                            username: '',
                            name: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            phone: '',
                            term_cond_aggree: false
                        }}
                        validationSchema={RegisterSchema}
                        onSubmit={async(values, {setSubmitting})=>{
                            try {
                                MySwal.fire({
                                    title: "Confirmation",
                                    icon:"question",
                                    text: "Are you sure want to register account?",
                                    customClass: {
                                        cancelButton: 'bg-gray-400 p-3 rounded-lg w-48 text-white font-bold mr-5',
                                        confirmButton: 'bg-primary p-3 rounded-lg w-48 text-white font-bold'
                                    },
                                    buttonsStyling: false
                                }).then((result:any)=>{
                                    if (result.isConfirmed) {
                                        apiService.auth.register(values)
                                        MySwal.fire({
                                            title: "Info",
                                            icon:"info",
                                            text: "Register Success",
                                            customClass: {
                                                cancelButton: 'bg-gray-400 p-3 rounded-lg w-48 text-white font-bold mr-5',
                                                confirmButton: 'bg-primary p-3 rounded-lg w-48 text-white font-bold'
                                            },
                                            buttonsStyling: false
                                        }).then(result=>{
                                            if (result.isConfirmed) {
                                                router.push('/login')
                                            }
                                        })
                                    }
                                })

                            } catch (error) {
                                console.error(error)
                            }
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
                        setFieldValue
                    })=>(
                        <Form>
                            <div className="flex flex-col mb-3">
                                <label className="w-full font-bold" htmlFor="username">Username *</label>
                                <Field type="text" name="username" id="username" className={`w-full rounded-lg focus:bg-white ${values.username != '' ? 'bg-white' : 'bg-gray-200'}`} />
                                <ErrorMessage name="username" component={"div"} className="text-red-400 text-sm"/>
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="name" className="w-full font-bold">Name *</label>
                                <Field type="text" name="name" id="name" className={`w-full rounded-lg focus:bg-white ${values.name != '' ? 'bg-white' : 'bg-gray-200'}`} />
                                <ErrorMessage name="name" component={"div"} className="text-red-400 text-sm"/>
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="email" className="w-full font-bold">Mail *</label>
                                <Field type="text" name="email" id="email" className={`w-full rounded-lg focus:bg-white ${values.email != '' ? 'bg-white' : 'bg-gray-200'}`} />
                                <ErrorMessage name="email" component={"div"} className="text-red-400 text-sm"/>
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="phone" className="w-full font-bold">Phone Number</label>
                                <Field type="text" name="phone" id="phone" className={`w-full rounded-lg focus:bg-white ${values.phone != '' ? 'bg-white' : 'bg-gray-200'}`} 
                                    onChange={(e:any)=>{setFieldValue('phone', numberOnly(e.target.value), false)}} 
                                />
                                <ErrorMessage name="phone" component={"div"} className="text-red-400 text-sm"/>
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="password" className="w-full font-bold">Password *</label>
                                <Field type="password" name="password" id="password" className={`w-full rounded-lg focus:bg-white ${values.password != '' ? 'bg-white' : 'bg-gray-200'}`} />
                                <ErrorMessage name="password" component={"div"} className="text-red-400 text-sm"/>
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="password" className="w-full font-bold">Confirm Password *</label>
                                <Field type="password" name="confirmPassword" id="confirmPassword" className={`w-full rounded-lg focus:bg-white ${values.password != '' ? 'bg-white' : 'bg-gray-200'}`} />
                                <ErrorMessage name="confirmPassword" component={"div"} className="text-red-400 text-sm"/>
                            </div>
                            <div className="text-sm mb-3 text-center">
                                
                                <input type="checkbox" name="term_cond_aggree" id="checkboxAgree" className="rounded" onChange={(e:any)=>{setFieldValue('term_cond_aggree', e.target.checked, false)}} /> <label htmlFor="checkboxAgree">I agree to Term of Service and Privacy Policy</label>
                                <ErrorMessage name="term_cond_aggree" component={"div"} className="text-red-400 text-sm"/>
                            </div>
                            <div className="flex justify-between gap-3">
                                <button
                                    className="bg-gray-200 p-3 rounded w-full text-[#808080] font-bold"
                                    type="button"
                                    onClick={()=>router.back()}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-primary p-3 rounded w-full text-white font-bold"
                                    type="submit"
                                >
                                    Create Account
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                </div>
            </div>
        </div>
        </main>
    );
}
