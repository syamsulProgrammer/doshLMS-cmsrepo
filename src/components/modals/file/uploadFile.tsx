"use client"
import apiService from "@/apiService"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { X } from "react-feather"
// import { setTimeout } from "timers/promises"

const ModalUploadFile = (props:any)=>{
    const [folderId, setFolderId] = useState(props.folderId)
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [clickedCount, setClickedCount] = useState(0)
    const inputFile = useRef<HTMLInputElement>(null);
    const [readedFile, setReadedFile] = useState<FileReader[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [allFormData, setAllFormData] = useState<FormData>()
    useEffect(()=>{
        // console.log('file list changing: ', selectedFiles);
        console.log(props.folderId)
    },[selectedFiles, props.folderId])
    
    const handleFile = (e:any)=>{
        // console.log(e)
    }

    const handleChangeFile = (e:any)=>{
        if (e.target.files) {
            // console.log('updated', selectedFiles.length)
            let newFiles: File[] = selectedFiles;
            let readed: FileReader[] = readedFile;
            const formData = new FormData();
            selectedFiles.map((sf:any)=>{
                formData.append('file', sf)
            })
            for (let k = 0; k < e.target.files.length; k++) {
                newFiles.push(e.target.files[k]);
                const fileData = new FileReader()
                fileData.onloadend = handleFile
                fileData.readAsDataURL(e.target.files[k])
                readed.push(fileData)
                formData.append('file',e.target.files[k])
            }
            setAllFormData(formData)
            setReadedFile([...readed])
            setSelectedFiles([...newFiles])
        }
    }

    const handleUpload = async ()=>{
        // var formData = new FormData()
        // formData.append('folder_id', folderId)
        // formData.append("file", inputFile.current)
        allFormData?.append('folder_id', props.folderId)
        setIsSubmitting(true)
        await apiService.fileManager.upload(allFormData).then(data=>{
            console.log(data)

            setSelectedFiles([])
            setTimeout(()=>{
                setIsSubmitting(false)
                // props.handleReloadData(folderId)
                props.onClose()
            },500)
        }).catch(err=>{
            console.error(err)
        })
        // props.handleUpload(allFormData)
        // axios.post("/api/upload", allFormData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // }).then(data=>{
        //     console.log(data, "berhasil upload")
        //     setSelectedFiles([])
        //     props.handleReloadData()
        //     props.onClose()
        // }).catch((err:any)=>{
        //     console.error(err)
        // })
    }

    return(
        <div className={`${props.show ? 'block' : 'hidden'} absolute top-0 left-0 bottom-0 bg-black/25 w-full h-full p-3 justify-center flex items-center`}>
            <div className="bg-white rounded-lg p-3 w-1/2">
                <div className="flex justify-between">
                    <h2 className="font-bold">Upload File</h2>
                    <button
                        onClick={()=>props.onClose()}
                    ><X className={``}/></button>
                </div>
                <div>
                    <button className="bg-gray-200 p-5 w-full"
                        onClick={()=>{
                            // document.getElementById("file_fields")?.click()
                            // setClickedCount(clickedCount + 1)
                            if (inputFile.current) {
                                inputFile.current.click()                               
                            }

                        }}
                    >Select File</button>
                    <div>
                        {selectedFiles && selectedFiles.map((item:any, index:number)=>{
                            return(
                                <div key={index}>
                                    {item.name}
                                </div>
                            )
                        })}
                    </div>
                    <div className="mt-5">
                        <button className="bg-primary p-3 w-full text-white font-bold rounded"
                            disabled={isSubmitting}
                            onClick={()=>handleUpload()}
                        >Upload</button>
                    </div>
                    <input className="hidden" id="file_fields" name="file" type="file" 
                        ref={inputFile}
                        onChange={(e)=>handleChangeFile(e)}
                    />
                </div>
            </div>
        </div>
    )
}

export default ModalUploadFile