import { useEffect, useState } from "react";
interface Props{
    name:string
}
const StatusBadge = (props:Props)=>{
    const [statusText, setStatusText] = useState(props.name)
    const [badgeClass, setBadgeClass] = useState('badge-warning')
    useEffect(()=>{
        switch (props.name) {
            case 'in progress':
                setStatusText('In Progress')
                setBadgeClass('badge-warning')
                break;
            case 'on_going':
                setStatusText('On Going')
                setBadgeClass('badge-disabled')
                break;
            case 'completed':
                setStatusText('Completed')
                setBadgeClass('badge-success')
                break;
            default:

                break;
        }
    },[props])
    return(
        <div className={`${badgeClass} p-1 rounded-lg text-center text-xs font-bold text-white`}>
            {statusText}
        </div>
    )
}

export default StatusBadge