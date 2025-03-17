"use client"
import { Koulen } from "next/font/google";
import Image from "next/image"
import imageBrandLogo from "./../assets/images/innoveam-logo.png"
import imageDoshLogo from "./../assets/images/dosh-logo.png"
import NotificationBell from "./notificationBell"
import { deleteCookie, getCookie } from "cookies-next"
import { useParams, useRouter } from "next/navigation"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import NotificationComponent from "./notification";
import { useEffect, useState } from "react";
import { getFirstChar } from "@/helpers/string";
import ModalEditProfile from "./modals/profile/editProfile";
import apiService from "@/apiService";
import ModalEditPhoto from "./modals/profile/editPhoto";
import { getApiUrl } from "@/helpers/urls";
const MySwal = withReactContent(Swal)
const koulen = Koulen({ subsets: ["latin"], weight: '400' });
const Header = (props:any)=>{
    const [username, setUsername] = useState()
    const [role, setRole] = useState()
    const [showModalEditProfile, setShowModalEditProfile] = useState(false)
    const [showModalEditPhoto, setShowModalEditPhoto] = useState(false)
    const [sessionUser, setSessionUser] = useState({})
    const [myProfile, setMyProfile] = useState({
        username: '',
        fullName: "",
        email: "",
        workerId: "",
        role: "",
        photo: ""
    })

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
            reverseButtons: true,
            showCancelButton: true,
            buttonsStyling: false
        }).then((result)=>{
            if (result.isConfirmed) {
                deleteCookie('isAuthed')
                deleteCookie('token')
                deleteCookie('refreshToken')
                deleteCookie('session_user')
                location.reload()
                // router.push('/login')                
            }
        })
    }
    useEffect(()=>{
        const session_user:any = JSON.parse(getCookie('session_user') || "{}")
        // setSessionUser(session_user)
        setMyProfile(session_user)
        setUsername(session_user.username)
        setRole(session_user.role)
    },[showModalEditProfile])
    return(
        <div className="header flex justify-between py-10 items-center">
            <div className="w-1/3 flex">
                <h2 className={`${koulen.className} uppercase text-3xl`}>{props.pageTitle}</h2>
            </div>
            <div className="w-1/3 justify-end flex gap-5 items-center">
                <div className="flex gap-5 relative group cursor-pointer">
                    <div className="bg-white rounded-full w-12 h-12 text-center items-center flex justify-center capitalize cursor-pointer overflow-hidden"
                        // onClick={()=>setShowModalEditPhoto(true)}
                    >
                        {myProfile.photo !== null ? 
                            // return(
                                <Image src={getApiUrl()+myProfile.photo} alt="Profile Picture" width={100} height={100}/>
                            // )
                         : (
                            getFirstChar(username || "Username")
                        )}

                    </div>
                    <div className="grow">
                        <h3 className="font-bold cursor-pointer" onClick={()=>{
                            // apiService.profile.getProfile().then(data=>{
                            //     console.log(data)
                            //     setMyProfile(data)
                            //     setShowModalEditProfile(true)
                            // })
                            setShowModalEditProfile(true)
                        }}>
                            {username}
                        </h3>
                        <h4>{role}</h4>
                    </div>
                    <div className="bg-white absolute bottom-[-40px] border-2 rounded-lg text-sm w-full hidden group-hover:block z-50">
                        <ul>
                            <li className="p-2" onClick={()=>{
                                setShowModalEditProfile(true)
                            }}>Edit Profile</li>
                        </ul>
                    </div>
                </div>
                {/* <NotificationBell /> */}
                {/* <NotificationComponent/> */}
                <button 
                    className="bg-primary p-2 rounded text-white"
                    onClick={()=>handleLogout()}>Logout</button>
            </div>
            {showModalEditPhoto ? (
                <ModalEditPhoto show={showModalEditPhoto} onClose={()=>setShowModalEditPhoto(false)} />
            ) : null }
            {showModalEditProfile ? (
                <ModalEditProfile show={showModalEditProfile} onClose={()=>setShowModalEditProfile(false)} data={myProfile}/>
            ) : null}
        </div>
    )
}

export default Header