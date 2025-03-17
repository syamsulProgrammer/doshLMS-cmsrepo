import { Bell } from "react-feather"


const NotificationBell = (props:any)=>{
    return(
        <div className="cursor-pointer">
            <Bell color="black" fill="black" />
            {props.notificationCount}            
        </div>
    )
}

export default NotificationBell