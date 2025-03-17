import { Field, Form, Formik } from "formik"
import * as Yup from 'yup';
import { numberOnly } from "@/helpers/string";
import Link from "next/link";
import apiService from "@/apiService";
// import { useRouter } from "next/router";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
const ModalRegisterUser = (props:any)=>{
    // const router = useRouter()
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
        workerId: Yup.string().nullable().notRequired(),
        password: Yup.string()
          .min(5, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        acceptTermOfService: Yup.boolean().oneOf([true], "You must accept Term of Service and Privacy Policy")
      });
    return(
        <div className={`${props.show ? 'block bg-black/30 backdrop-opacity-5' : 'hidden'} flex justify-center items-center fixed top-0 left-0 right-0 bottom-0`}>
            <div className="blur-none bg-white p-8 rounded-lg w-1/2">
                <h2 className="text-2xl font-bold text-center">Create Account</h2>
                <div>
                    <Formik
                        initialValues={{
                            username: '',
                            name: '',
                            email: '',
                            workerId: '',
                            password: '',
                            acceptTermOfService: false
                        }}
                        onSubmit={(values, {setSubmitting, resetForm, setErrors})=>{
                            MySwal.fire({
                                title: "Confirmation",
                                icon:"question",
                                text: "Are you sure want to register account?",
                                showCancelButton: true,
                                reverseButtons: true,
                                customClass: {
                                    cancelButton: 'bg-gray-400 p-3 rounded-lg w-48 text-white font-bold mr-5',
                                    confirmButton: 'bg-primary p-3 rounded-lg w-48 text-white font-bold'
                                },
                                buttonsStyling: false
                            }).then(result=>{
                                if (result.isConfirmed) {
                                    // apiService.auth.register(values)
                                    apiService.auth.register({
                                        name: values.name,
                                        username: values.username,
                                        email: values.email,
                                        password: values.password,
                                        confirm_password: values.password
                                    }).then(data=>{
                                        setSubmitting(false)
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
                                                // router.push('/login')
                                                props.onClose()
                                            }
                                        })
        
                                    }).catch(err=>{
                                        setSubmitting(false)
                                        
                                        props.onClose()
                                    })
                                    resetForm()
                                    // router
                                    props.onClose()

                                } else {
                                    setSubmitting(false)
                                }
                            })

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
                                        type="text" name="email" id="email" placeholder="Email"
                                        value={values.email}
                                    />
                                    {errors.email && touched.email ? (
                                        <div className="text-xs text-danger">{errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="password" className="w-full font-bold">Password *</label>
                                    <Field 
                                        className={`w-full rounded-lg focus:bg-white ${values.password != '' ? 'bg-white' : 'bg-gray-200'}`}
                                        type="password" name="password" id="password" value={values.password} placeholder="Password" />
                                    {errors.password && touched.password ? (
                                        <div className="text-xs text-danger">{errors.password}</div>
                                    ) : null}
                                </div>
                                <div className="flex justify-between text-sm pt-3">
                                    <div className="flex gap-2 items-center">
                                        <Field type="checkbox" name="acceptTermOfService" id="acceptTermOfService" className="rounded focus:ring-0 focus:ring-offset-0 focus:outline-none accent-green-500 appearance-none" 
                                            onChange={(e:any)=>{
                                                setFieldValue("acceptTermOfService", e.target.checked)
                                            }}
                                            checked={values.acceptTermOfService}
                                        /><label htmlFor="acceptTermOfService">I accept the Terms of Service and Privacy Policy</label>
                                        
                                        {/* <input type="checkbox" name="keepLogin" id="fieldKeepLogin" className="rounded" />  */}
                                    </div>
                                </div>
                                {errors.acceptTermOfService && touched.acceptTermOfService ? (
                                        <div className="text-xs text-danger w-full mb-3">{errors.acceptTermOfService}</div>
                                    ) : null}
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
                                        Create Account
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default ModalRegisterUser