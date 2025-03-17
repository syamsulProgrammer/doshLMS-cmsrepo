import Preview from "@/components/filePreviewFull"
import Image from "next/image"
import { X } from "react-feather"
import ListFileUserTable from "./listFileUserTable"

interface Props{
    show?:boolean,
    onClose():void,
    files:{
        rows: Array<any>,
        pagination: any,
        card: any
    },
    userId: string
}



const ModalFileUser = (props:Props)=>{
    return(
        <div className={`${props.show ? 'block' : 'hidden'} fixed top-0 left-0 bottom-0 bg-black/25 w-full h-full p-3 justify-center flex items-center`}>
            <div className="bg-white w-2/3 rounded-lg max-h-full">
                <div className="flex justify-between p-3">
                    <h3>User Files</h3>
                    <button onClick={()=>props.onClose()}>
                        <X/>
                    </button>
                </div>
                <div className="p-3 pt-0 min-h-96">
                    {
                        props.files.rows.length > 0 ? (
                            <div>
                                <ListFileUserTable data={props.files.rows} pagination={props.files.pagination} userId={props.userId}/> 
                            </div>
                        ) : (
                            <div className="flex justify-center items-center p-12 bg-gray-200 rounded-lg h-full">
                                No Data Found
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}


export default ModalFileUser