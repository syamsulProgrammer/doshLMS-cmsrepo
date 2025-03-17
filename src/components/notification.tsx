"use client"
import useComponentVisible from "@/helpers/useComponentVisible";
import { useEffect, useRef, useState } from "react"
import NotificationBell from "./notificationBell";
import { get_random_array } from "@/helpers/string";

interface Props{
    show:boolean,
    onClose():void
}

const NotificationComponent = ()=>{
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    const [showNotification, setShowNotification] = useState(false)
    const [notificationCount, setNotificationCount] = useState(0)
    useEffect(()=>{
        // let temp = get_random_array([0, 2, 10, 100])
        let temp = get_random_array([0])
        setNotificationCount(temp)
        if (temp == 0) {
            setIsComponentVisible(false)
        }
    },[])
    return(
        <div className="flex items-center relative" ref={ref}>
            <button 
                className="relative"
                onClick={(e)=>{
                    e.stopPropagation()
                    // props.onClose()


                    if (isComponentVisible) {
                        setIsComponentVisible(false)
                    } else {
                        setIsComponentVisible(true)
                    }

                }}
            >
                <NotificationBell />
                <div className={`${notificationCount == 0 ? 'hidden' : 'block'} absolute -top-2 -right-2 text-white p-1 font-medium text-[8px] bg-red-400 rounded-full w-[18px] h-[18px] flex items-center justify-center`}>
                    {(notificationCount > 99 ? '99+' : notificationCount)}
                </div>
                
            </button>
            {isComponentVisible && (
                <div 
                    className={`absolute top-5 right-0 border p-3 shadow-2xl rounded-lg w-96 bg-white z-10`}>
                    <h2 className="font-bold">Notification</h2>
                    <div className="min-h-48">
                        Notification Empty
                    </div>
                </div>
            )}
            
        </div>
        
    )
}

export default NotificationComponent