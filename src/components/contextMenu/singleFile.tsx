import { useState } from "react"

const ContextMenuSingleFile = (props:any)=>{
    // console.log(props.coordinate[1])
    const [coords, setCoords] = useState({
        x: props.coordinate.x,
        y: props.coordinate.y
    })
    return(
        <div className={`absolute ${props.show ? 'block' : 'hidden'}`} style={{
            top: coords.y,
            left: coords.y
        }}>
            {coords.y}
            Context Menu
        </div>
    )
}

export default ContextMenuSingleFile