"use client"
import { Koulen } from "next/font/google";
import Image from "next/image"
import imageBrandLogo from "./../assets/images/innoveam-logo.png"
import imageDoshLogo from "./../assets/images/dosh-logo.png"
import NotificationBell from "./notificationBell"
import { deleteCookie } from "cookies-next"
import { useParams, useRouter } from "next/navigation"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { X } from "react-feather";
const MySwal = withReactContent(Swal)
const koulen = Koulen({ subsets: ["latin"], weight: '400' });
const HeaderSession = (props:any)=>{
    // console.log(props.data)
    const router = useRouter()
    const params = useParams()
    const handleLogout = ()=>{
        MySwal.fire({
            title: 'Confirmation',
            text: 'Do you want to logout?',
            icon: 'question',
            customClass: {
                cancelButton: 'bg-gray-400 p-3 rounded-lg w-48 text-white font-bold mr-5',
                confirmButton: 'bg-primary p-3 rounded-lg w-48 text-white font-bold'
            },
            buttonsStyling: false
        }).then((result)=>{
            if (result.isConfirmed) {
                deleteCookie('isAuthed')
                deleteCookie('token')
                router.push('/login')                
            }
        })
    }
    return(
        <div className="header flex justify-between p-3 items-center">
            {/* <div className="w-full flex justify-between"> */}
                <div className="flex items-center gap-5">
                    <h2 className={`${koulen.className} uppercase text-3xl`}>{props.pageTitle}</h2>
                    <button className="bg-[#8991BB] p-1 text-xs rounded capitalize text-white font-bold">
                        {props.data.scene}
                    </button>
                    {/* <button className={`${props.data.difficulty_level === "completed" ? "bg-success" : props.data.difficulty_level === "in_progress" ? "bg-warning" : "bg-danger"} p-1 text-xs rounded capitalize  text-white font-bold`}>
                        {props.data.difficulty_level}
                    </button> */}
                    <button className={`${props.status === "completed" ? "bg-success" : props.status === "in_progress" ? "bg-warning" : "bg-danger"} p-1 text-xs rounded capitalize  text-white font-bold`}>
                        {props.status === "completed" ? "Completed" : props.status === "in_progress" ? "In Progress" : "Failed"}
                    </button>
                </div>
                <button className="font-bold" onClick={()=>props.onClose()}><X strokeWidth={4}/></button>
            {/* </div> */}
        </div>
    )
}

export default HeaderSession