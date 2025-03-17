'use client';
import apiService from "@/apiService";
import ResetPasswordModal from "@/components/modals/confirmation/resetPassword";
import { ErrorPopup } from "@/helpers/errorPopup";
import { Field, Formik, Form, ErrorMessage } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Circle, Eye, EyeOff, Loader } from "react-feather";
import imageDoshLogo from "@/assets/images/dosh-logo-login.png"
import Image from "next/image";
import ModalRegisterUser from "@/components/modals/register";

export default function Login() {
    const [modalResetPasswordOpen, setModalResetPasswordOpen] = useState(false)
    const [modalRegisterUserOpen, setModalRegisterUserOpen] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
  return (
    <main className="login-layout login-page h-screen w-screen flex justify-end bg-white">
        <div className={`bg-white p-12 items-center align-middle inline-block w-2/5`}>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    rememberLogin: false
                }}
                onSubmit={async(values, {setSubmitting, setFieldError})=>{
                    await apiService.login(values).then(async response=>{
                        const token = response.data.accessToken
                        await apiService.auth.checkToken(token).then(data=>{
                            router.push('/dashboard')
                            setSubmitting(false)
                        }).catch(err=>{
                            throw err
                        })
                    }).catch(err=>{
                        if (Array.isArray(err.message)) {
                            err.message.map((item:any)=>{
                                setFieldError(item.path, item.msg)
                            })
                            setSubmitting(false)
                        } else {
                            ErrorPopup({
                                iconType: 'error',
                                message: err.message
                            }).then(data=>{
                                setSubmitting(false)
                            })
                        }
                    })
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
                    <div className={`flex flex-col w-full gap-24 h-full justify-center`}>
                        <div>
                        <Image src={imageDoshLogo} layout={"fixed"} width={500} height={100} alt="App logo" />
                        </div>
                        <form onSubmit={handleSubmit}>
                        <h2 className="text-4xl font-bold text-center pb-3">Login</h2>
                            <div className="mb-3">
                                <label htmlFor="username" className="font-bold">Username</label>
                                <input type="text" name="username" id="fieldUsername" className={`w-full rounded-lg focus:bg-white focus:ring-0 focus:ring-offset-0 focus:outline-none ${values.username != '' ? 'bg-white' : 'bg-gray-200'}`} placeholder="Username"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username}
                                />
                                <ErrorMessage name="username" component={"div"} className="text-red-400 text-sm"/>
                            </div>
                            <div>
                                <label htmlFor="password" className="font-bold">Password</label>
                                <div className="input-group flex items-center relative">
                                    <input type={showPassword ? 'text' : 'password'} name="password" id="fieldPassword" className={`w-full rounded-lg focus:bg-white focus:ring-0 focus:ring-offset-0 focus:outline-none ${values.username != '' ? 'bg-white' : 'bg-gray-200'}`} placeholder="Password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                    />
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
                                <ErrorMessage name="password" component={"div"} className="text-red-400 text-sm"/>
                            </div>
                            <div className="flex justify-between text-sm py-3">
                                <div className="flex gap-2 items-center">
                                    <Field type="checkbox" name="rememberLogin" id="fieldKeepLogin" className="rounded focus:ring-0 focus:ring-offset-0 focus:outline-none accent-green-500 appearance-none" /><label htmlFor="fieldKeepLogin">Keeps logged in</label>
                                    {/* <input type="checkbox" name="keepLogin" id="fieldKeepLogin" className="rounded" />  */}
                                </div>
                                <div>
                                    <Link href={"#"} onClick={()=>setModalResetPasswordOpen(true)}>Forgot Passwords?</Link>
                                </div>
                            </div>
                            <div className="flex gap-5">
                                {/* <Link href={"/register"} className="bg-gray-200 font-bold p-3 w-full disabled:bg-gray-300 flex justify-center gap-3 rounded-lg">
                                    Create Account
                                </Link> */}
                                <button type="button" onClick={()=>setModalRegisterUserOpen(true)} className="bg-gray-200 font-bold p-3 w-full disabled:bg-gray-300 flex justify-center gap-3 rounded-lg">
                                    Create Account
                                </button>
                                <button 
                                    className="bg-primary p-3 w-full text-white font-bold disabled:bg-gray-300 flex justify-center gap-3 rounded-lg"
                                    type="submit" disabled={isSubmitting}
                                ><Loader className={`${isSubmitting ? 'block' : 'hidden'} animate-spin`} /> Login</button>
                            </div>
                        </form>
                    </div>
                )}
            </Formik>
      </div>
      <ModalRegisterUser show={modalRegisterUserOpen} onClose={()=>setModalRegisterUserOpen(false)}/>
      <ResetPasswordModal show={modalResetPasswordOpen} onClose={()=>setModalResetPasswordOpen(false)}/>
    </main>
  );
}
