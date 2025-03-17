"use client"
import jwtHelpers from "@/helpers/jwt"
import { getCookie, getCookies } from "cookies-next"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { BarChart2, File, FileText, Monitor, User } from "react-feather"
import imageDoshLogo from "./../assets/images/dosh-logo.png"
import IconDashboard from "./icons/dashboard"
import IconUser from "./icons/user"
import IconFolder from "./icons/file"

const Sidebar = (props:any)=>{
    const pathname = usePathname()
    const [role, setRole] = useState(props.role)
    const storedCookies = getCookies()
    const rawToken = storedCookies
    const session_user:any = JSON.parse(getCookie('session_user') || "{}")
    useEffect(()=>{
        setRole(session_user.role)
    },[props])
    return(
        <>
            <div className="flex flex-col justify-center py-8 px-5">
                <div className="flex justify-center ">
                    <Image src={imageDoshLogo} className="text-center" layout={"fixed"} width={167} height={100} alt="App logo" />
                </div>
                <h3 className="text-[16px] font-bold uppercase text-center text-gray-600">
                Department of Occupational Safety and Health
                </h3>
            </div>
            {/* <div className="p-3">
                <img src="https://i.pravatar.cc/300" alt="" />
                <h3 className="text-center font-bold">Admin 1</h3>
            </div> */}
            <div>
                <ul className="sidebar group p-3">
                    <li className={`${pathname === '/dashboard' ? 'active text-white font-bold fill-white' : ''} hover:font-bold hover:text-white`}>
                        <Link href={"/dashboard"} className="p-3 flex gap-2">
                            <IconDashboard fill={pathname === '/dashboard' ? '#FFFFFF' : '#808080'}/>
                            <div>Dashboard</div>
                        </Link>
                    </li>
                    <li className={`${pathname === '/dashboard/file' ? 'active text-white font-bold hover:text-white' : 'hover:font-bold'} `}>
                        <Link href={"/dashboard/file"} className="p-3 flex gap-2">
                            <IconFolder fill={pathname === '/dashboard/file' ? '#FFFFFF' : '#808080'}/>
                            File Management
                        </Link>
                    </li>
                    <li className={`${pathname === '/dashboard/user' ? 'active text-white  font-bold' : ''} ${role === 'administrator' ? 'block' : 'hidden'} hover:font-bold`}>
                        <Link href={"/dashboard/user"} className="p-3 flex gap-2">
                            <IconUser fill={pathname === '/dashboard/user' ? '#FFFFFF' : '#808080'} />
                            User Management
                        </Link>
                    </li>
                    {/* <li className={`${pathname === '/dashboard/simulation' ? 'active text-white  font-bold' : ''} hover:font-bold`}>
                        <Link href={"/dashboard/simulation"} className="p-3 flex gap-2">
                            Simulation Analytic
                        </Link>
                    </li> */}
                    {/* <li className={`${pathname === '/dashboard/log-activity' ? 'active text-white  font-bold' : ''} hover:font-bold`}>
                        <Link href={"/dashboard/log-activity"} className="p-3 flex gap-2">
                            Log Activity
                        </Link>
                    </li> */}
                </ul>
            </div>
        </>
    )
}

export default Sidebar