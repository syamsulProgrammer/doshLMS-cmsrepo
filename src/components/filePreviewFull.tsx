import { getApiUrl } from "@/helpers/urls";
import Image from "next/image";
import { useState } from "react";
import { Maximize, X } from "react-feather";
interface PropsFile{
    fileType:string,
    file:any
}

const Preview = (props:PropsFile)=>{
    const [showFullscreen, setShowFullscreen] = useState(false)
    switch (props.fileType) {
        case 'image/png':
        case 'image/jpg':
        case 'image/jpeg':
            return(
                <div className="w-[50vw] overflow-scroll scrollbar-none">
                    <Image 
                        src={getApiUrl()+props.file.url} alt={props.file.file_name} 
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }} // optional
                    />
                    <Maximize className="absolute top-3 left-6 cursor-pointer"  onClick={()=>setShowFullscreen(true)}/>
                    <div className={`${showFullscreen ? 'fixed' : 'hidden'} top-0 bottom-0 left-0 right-0 bg-black/80 flex justify-center`}>
                        <Image 
                        src={getApiUrl()+props.file.url} alt={props.file.file_name} 
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: 'auto', height: '100%' }} // optional
                        />
                        <X className="fixed top-5 right-5 text-white cursor-pointer z-50" onClick={()=>setShowFullscreen(false)}/>
                    </div>
                </div>
            )
            break;
        case 'video/mp4':
            return(
                <div className="aspect-video">
                    <video width="400" className="aspect-video w-full" controls>
                        <source src={getApiUrl()+props.file.url} type="" />
                    </video>
                    {/* <Image src={getApiUrl()+item.url} alt={item.file_name} sizes="100vw" width={300} height={100}/> */}
                </div>
            )
            break;
    
        default:
            return(
                <div className="items-center flex justify-center aspect-video w-[70vw]">
                    <iframe className="w-full h-full" src={getApiUrl()+props.file.url}></iframe>
                </div>
            )
            break;
    }
}

export default Preview