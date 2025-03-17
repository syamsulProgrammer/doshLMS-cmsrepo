const ModalUploadProgress = (props:any)=>{
    return(
        <div className={`${props.show ? 'block' : 'hidden'} absolute right-3 bottom-3 bg-white p-3 w-96`}>
            Upload Progress
        </div>
    )
}

export default ModalUploadProgress