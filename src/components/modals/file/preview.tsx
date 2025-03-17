import Preview from "@/components/filePreviewFull"
import Image from "next/image"
import { X } from "react-feather"

interface Props{
    show?:boolean,
    onClose():void,
    file:any,
    fileType:string
}



const PreviewFile = (props:Props)=>{
    return(
        <div className={`${props.show ? 'block' : 'hidden'} fixed top-0 left-0 bottom-0 bg-black/25 w-full h-full p-3 justify-center flex items-center min-h-[70vh]`}>
            <div className="bg-white sm:max-w-screen-md md:max-w-screen-xl rounded-lg max-h-full">
                <div className="flex justify-between p-3">
                    <h3>Preview File</h3>
                    <button onClick={()=>props.onClose()}>
                        <X/>
                    </button>
                </div>
                <div className="p-3 pt-0 flex justify-center relative" style={{"maxHeight": "calc(100vh - 200px)", "width":"calc(100wh - 300px)"}}>
                    <Preview fileType={props.fileType} file={props.file} />
                </div>
            </div>
        </div>
    )
}


export default PreviewFile