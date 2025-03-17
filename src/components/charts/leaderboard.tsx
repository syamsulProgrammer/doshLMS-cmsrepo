interface Props{
    data:any
}
import colorHelper from "@/app/libs/colorHelpers"
import { useEffect, useState } from "react"
const Leaderboard = (props:Props)=>{
    const [selectedIndexLeaderboard, setSelectedIndexLeaderboard] = useState(0)
    // console.log(props, "props")
    useEffect(()=>{

    },[selectedIndexLeaderboard])
    return(
        <div>
            <table className="w-full text-left">
                <thead>
                    <tr>
                        <th className="text-left">Session</th>
                        <th className="text-left">Duration</th>
                        <th className="text-left">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data[0] && props.data[0].child ? (
                        props.data[selectedIndexLeaderboard].child.map((item:any, index:number)=>{
                            return(
                                <tr key={index} className="text-left">
                                    <td>{item.name}</td>
                                    <td>{parseFloat(item.duration).toFixed(2)} Min</td>
                                    <td>{parseFloat(item.score).toFixed(1)}</td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td colSpan={3} className="text-center">No Data Found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="w-full grid grid-cols-3 gap-3 py-3">
                {props.data.map((item:any, index:number)=>{
                    return(
                        // <div>
                            <button key={index+"session"} className={`${colorHelper.cardBg[index]} 'border-2 shadow-md' ${selectedIndexLeaderboard == index ? 'border-double border-black' : ''} rounded-lg text-center px-3 py-1 text-white font-bold border-cyan-400`}
                                onClick={()=>{
                                    setSelectedIndexLeaderboard(index)
                                    console.log(index)
                                }}
                            >
                                {item.name}
                            </button>
                        // </div>
                    )
                })}
            </div>
        </div>
    )
}


export default Leaderboard