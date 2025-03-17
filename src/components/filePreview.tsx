import { getApiUrl } from "@/helpers/urls";
import Image from "next/image";
import { DownloadCloud, File, Folder } from "react-feather";

interface Props{
    fileType: string,
    data: any
}

const FilePreview = (props:Props)=>{
    const item = props.data
    switch (props.fileType) {
        case 'image/png':
        case 'image/jpg':
        case 'image/jpeg':
            return(
                <div className="w-auto">
                    <Image className="h-full" src={getApiUrl()+item.url} alt={item.file_name} width={900} height={900}/>
                </div>
            )
            break;
        case 'video/mp4':
            return(
                <div className="aspect-video">
                    <video width="400" className="aspect-video">
                        <source src={getApiUrl()+item.url} type="" />
                    </video>
                    {/* <Image src={getApiUrl()+item.url} alt={item.file_name} sizes="100vw" width={300} height={100}/> */}
                </div>
            )
            break;
        case "application/pdf":
            return(
                <div className="items-center flex justify-center aspect-video">
                    <Image src={"/icon-pdf.png"} alt={item.file_name} width={84} height={64}/>
                </div>
            )
            break;
        default:
            return(
                <div className="items-center flex justify-center aspect-video">
                    <Folder width={64} height={64} />
                    {/* <Image src={"/icon-pdf.png"} alt={item.file_name} width={84} height={64}/> */}
                </div>
            )
            break;
    }
}

export default FilePreview