import Image from "next/image"
import { AlertTriangle, Archive, DownloadCloud, File, FileText, Folder, Video, Volume } from "react-feather"

interface Props {
    mimeType?:string,
    fileType:string,
    tipe?:string
}

const FileTypeIcon = (props: Props)=>{
    switch (props.fileType) {
        case 'image/png':
        case 'image/jpg':
        case 'image/jpeg':
            return(
                <>
                    <Image src={"/icon-image.png"} alt="Image Media" width={16} height={16}/>
                </>
            )
            break;
        case 'video/mp4':
            return (
                <>
                    <Image src={"/icon-video.png"} alt="Image Media" width={16} height={16}/>
                </>
            )
            break;
        case 'application/pdf':
            return (
                <>
                    <Image src={"/icon-document.png"} alt="Image Media" width={16} height={16}/>
                </>
            )
            break;
        case null:
            return (
                <>
                    <Folder width={18} height={18}/>
                </>
            )
            break;
        default:
            return(
                <>
                    <Image src={"/icon-document.png"} alt="Image Media" width={16} height={16}/>
                </>
            )
            break;
    }
    
}

export default FileTypeIcon