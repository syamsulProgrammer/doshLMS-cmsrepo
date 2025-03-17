"use client"
import { useEffect, useRef, useState } from "react"
import ModalUploadFile from "@/components/modals/file/uploadFile"
import ModalUploadProgress from "@/components/modals/file/uploadProgress"
import moment from "moment"
import axios from "axios"
import { ChevronRight, Grid, Home, List, Loader, MoreVertical, Plus, PlusSquare } from "react-feather"
import { Field, Form, Formik } from "formik"

import { Menu, Item, Separator, Submenu, useContextMenu, contextMenu } from 'react-contexify';
import 'react-contexify/ReactContexify.css';
import Image from "next/image"
import FileTypeIcon from "@/components/fileTypeIcon"
import ModalCreateNewFolder from "@/components/modals/file/createNewFolder"
import { getApiUrl, getBaseUrl } from "@/helpers/urls"
import FilePreview from "@/components/filePreview"
import PreviewFile from "@/components/modals/file/preview"
import fileDownload from 'js-file-download'
import { getCookie } from "cookies-next"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import apiService from "@/apiService"
import SearchInput from "@/components/form/SearchInput"
const MySwal = withReactContent(Swal)
// import styled from 'styled-components';
// import { Menu } from 'contexify';

// const StyledMenu = styled(Menu).attrs({
//   // custom props
// })`
//   .contexify_submenu-arrow {}
//   .contexify_separator {}
//   .contexify_item {}
// `;

const MENU_ID = 'blahblah';
const MENU_ID2 = 'blahblah2';

const ListFileUserTable = (props:any)=>{
    const [breadcrumb, setBreadCrumb] = useState("")
    const [parentId, setParentId] = useState("")
    const [showModalUploadFile, setShowModalUploadFile] = useState(false)
    const [showModalUploadProgressFile, setShowModalUploadProgressFile] = useState(false)
    const [showModalCreateFolder, setShowModalCreateFolder] = useState(false)
    const [showModalPreview, setShowModalPreview] = useState(false)
    const [selectedRowIds, setSelectedRowIds] = useState(Array<string>)
    const [selectedFile, setSelectedFile] = useState({
        file_id:"",
        file_name:null,
        status:"file",
        url:"",
        mimeType:""
    })
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(20)
    const [pagination, setPagination] = useState(props.pagination)
    const dragItem = useRef()
    const dragOverItem = useRef()
    const [itemDragIn, setItemDragIn] = useState(null)
    const [listFile, setListFile] = useState(props.data)
    const [viewMode, setViewMode] = useState('list')
    const [folderClicked, setFolderClicked] = useState(false)
    const [selectedFileType, setSelectedFileType] = useState("image/png")
    const handleUpload = (payload:any)=>{
        // console.log(payload)
    }

    const handleReloadData = async(parentId:string = "")=>{
        try {
            const data = await axios.get(getBaseUrl()+"/api-v1/file?parentId="+parentId+"&userId="+props.userId,{
                headers: {
                    'Authorization': getCookie('token')
                }
            })
            setListFile(data.data.data.rows)
            // setSelectedRowIds([])
        } catch (error) {
            throw error
        }
    }

    const { show } = useContextMenu({
        id: MENU_ID,
    });
    

    // const { show as show2 } = useContextMenu({
    //     id: MENU_ID2,
    // });

    function getSelectedFile(id:string){
        const founded = listFile.find((item:any)=>item.file_id == id)
        return founded
    }
    
    const downloadFile = (selected:any)=>{
        if (selected) {
            console.log(selected, "selected")
            axios.get(getApiUrl()+"/"+selected.url, {
                responseType: 'blob',
            })
            .then((res) => {
                fileDownload(res.data, selected.file_name)
            })   
        }
    }

    const handleScroll = async (e:any)=>{
        try {
            const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
           if (bottom) { 
                if (pagination.totalPage > currentPage) {
                    setLoading(true)
                    const data = await apiService.fileManager.list(currentPage + 1, currentLimit, "")
                    // console.log(data, "data....")
                    setCurrentPage(currentPage + 1)
                    var temp = listFile
                    // temp.push(data.rows)

                    var merged = temp.concat(data.rows)

                    setListFile(merged)
                    setPagination(data.pagination)   
                    setLoading(false)
                }
           }
        } catch (error) {
            throw error
        }
    }

    function handleItemClick(props:any){
        const selected = getSelectedFile(props.props.key)
        switch (props.id) {
            case 'openFolder':
                // console.log(selected)
                setSelectedFile(selected)
                handleReloadData(selected.file_id)
                setParentId(selected.parent_id)
                // setSelectedFile(selected)
                // setTimeout(()=>{
                //     setShowModalPreview(true)
                // }, 500)
                break;
            case 'preview':
                if (selected.status == "folder") {
                    setBreadCrumb(selected.file_name)
                } else {
                    setBreadCrumb("")
                    setSelectedFile({
                        file_id:"",
                        file_name:null,
                        status:"file",
                        url:"",
                        mimeType:""
                    })
                 // setSelectedFile(selected)
                    // console.log("do nothine")
                }

                setSelectedFile(selected)
                setTimeout(()=>{
                    setShowModalPreview(true)
                }, 500)
                break;
            case 'download':
                MySwal.fire({
                    title: 'Confirmation',
                    text: 'Do you want to download this file?',
                    icon: 'question',
                    customClass: {
                        cancelButton: 'bg-gray-400 p-3 rounded-lg w-48 text-white font-bold mr-5',
                        confirmButton: 'bg-primary p-3 rounded-lg w-48 text-white font-bold'
                    },
                    buttonsStyling: false
                }).then((result)=>{
                    if (result.isConfirmed) {
                        // if (selected) {
                            downloadFile(selected)
                        // }
                    }
                })
                break;
            case 'delete':
                MySwal.fire({
                    title: 'Confirmation',
                    text: 'Do you want to delete this file?',
                    icon: 'question',
                    customClass: {
                        cancelButton: 'bg-gray-400 p-3 rounded-lg w-48 text-white font-bold mr-5',
                        confirmButton: 'bg-primary p-3 rounded-lg w-48 text-white font-bold'
                    },
                    buttonsStyling: false
                }).then((result)=>{
                    if (result.isConfirmed) {
                        // if (selected) {
                            // downloadFile(selected)
                            axios.delete(getBaseUrl()+'/api-v1/file/delete/'+props.props.key, {
                                headers: {
                                    'Authorization': getCookie('token')
                                }
                            }).then(data=>{
                                handleReloadData(selectedFile.file_id)
                            }).catch(err=>{
                                console.error(err)
                            })
                        // }
                    }
                })

                break;
            case 'duplicate':
                MySwal.fire({
                    title: 'Confirmation',
                    text: 'Do you want to duplicate this file?',
                    icon: 'question',
                    customClass: {
                        cancelButton: 'bg-gray-400 p-3 rounded-lg w-48 text-white font-bold mr-5',
                        confirmButton: 'bg-primary p-3 rounded-lg w-48 text-white font-bold'
                    },
                    buttonsStyling: false
                }).then((result)=>{
                    if (result.isConfirmed) {
                        axios.put(getBaseUrl()+'/api-v1/file/duplicate/'+props.props.key,{}, {
                            headers: {
                                'Authorization': getCookie('token')
                            }
                        }).then(data=>{
                            handleReloadData(selectedFile.file_id)
                        }).catch(err=>{
                            console.error(err)
                        })
                    }
                })
                break;
            case 'rename':
                MySwal.fire({
                    title: 'Confirmation',
                    text: 'Do you want to rename this file? please input new name below',
                    icon: 'question',
                    input: 'text',
                    // input: 'New File Name?',
                    customClass: {
                        cancelButton: 'bg-gray-400 p-3 rounded-lg w-48 text-white font-bold mr-5',
                        confirmButton: 'bg-primary p-3 rounded-lg w-48 text-white font-bold'
                    },
                    buttonsStyling: false
                }).then((result)=>{
                    if (result.value) {
                        var file_name = "new File name"
                        axios.post(getBaseUrl()+'/api-v1/file/rename/'+props.props.key, {
                            file_name: result.value
                        },{
                            headers: {
                                'Authorization': getCookie('token')
                            }
                        }).then(data=>{
                            handleReloadData(selectedFile.file_id)
                        }).catch(err=>{
                            console.error(err)
                        })   
                    }
                })
                break;
            default:
                break;
        }
    }

    const handleDropFile = ()=>{
        setItemDragIn(null)
        setSelectedRowIds([])
        apiService.fileManager.move(
            dragOverItem.current || "",
            dragItem.current ? selectedRowIds : []
        ).then(()=>{
            setSelectedRowIds([])
            setSelectedFile({
                file_id:"",
                file_name:null,
                status:"file",
                url:"",
                mimeType:""
            })
            handleReloadData(selectedFile.file_id)
        })

    }

    function handleContextMenu(event:any){
        if ((event.target.parentNode ? event.target.parentNode.getAttribute('data-object_type') : "folder") == "folder") {
            show({
                id: MENU_ID,
                event,
                props: {
                    key: event.target.parentNode ? event.target.parentNode.getAttribute('data-id') : '',
                    data: Boolean(event.target.parentNode ? event.target.parentNode.getAttribute('data-is_folder') : "false")
                }
            })
        } else {
            show({
                id: MENU_ID2,
                event,
                props: {
                    key: event.target.parentNode ? event.target.parentNode.getAttribute('data-id') : '',
                    data: Boolean(event.target.parentNode ? event.target.parentNode.getAttribute('data-is_folder') : "false")
                }
            })
        }        
    }

    const handleSearchFile = async(text:string)=>{
        try {
            const data = await apiService.fileManager.list(1,20,text, "all",props.userId)
            setListFile(data.rows)      
          } catch (error) {
            console.error(error)
          }
    }
    const handleCreateNewFolder = async(name:string)=>{
        try {
            const newFolder = await apiService.fileManager.createFolder(name)
            const data = await apiService.fileManager.list(1,20,"")
            setListFile(data.rows)     
            setShowModalCreateFolder(false) 
          } catch (error) {
            console.error(error)
          }
    }

    const checkSelectedRowIds = (file_id:string)=>{
        const founded = selectedRowIds.find((item)=>{
            return item === file_id
        })
        return typeof founded == "undefined" ? false : true
    }


    useEffect(()=>{
        setListFile(props.data)
    },[props.data])

    return(
        <div className="bg-white rounded-lg flex flex-col overflow-hidden">
            <div className="text-sm">
            {parentId}
                {selectedFile?.file_name !== "" ? (
                    <div className={`flex items-center gap-1 mb-3 ${breadcrumb !== "" || parentId !== "" ? 'block' : 'hidden'}`}>
                        <button
                            onClick={()=>{
                                setBreadCrumb("")
                                handleReloadData().then(()=>{
                                    setSelectedFile({
                                        file_id:"",
                                        file_name:null,
                                        status:"file",
                                        url:"",
                                        mimeType:""
                                    })
                                })

                            }}
                        >
                            <Home width={16}/>
                        </button>
                        <div><ChevronRight width={16} /></div>
                        <div>
                        {breadcrumb}
                        </div>
                    </div>
                ) : (
                    null
                )}
            </div>
            <div className="flex flex-col gap-3 grow overflow-y-scroll overflow-x-hidden">
                <div className="flex gap-3">
                    <Formik
                        initialValues={{
                            searchKey: ''
                        }}
                        onSubmit={async(values, {setSubmitting, setFieldError})=>{
                            // console.log("onsubmit")
                            handleSearchFile(values.searchKey)
                        }}
                    >
                        <Form className="w-full">
                            <Field type="text" className={`w-full rounded-lg focus:bg-white focus:ring-0 focus:ring-offset-0 focus:outline-none`} placeholder="Search" name="searchKey"
                                component={SearchInput}
                            />
                        </Form>
                    </Formik>
                    <div className="flex items-center">
                        <button className={`p-2 ${viewMode === 'list' ? 'bg-primary' : 'bg-gray-300'} rounded-l-lg`} onClick={()=>setViewMode('list')}>
                            <List color={`${viewMode === 'list' ? '#FFFFFF' : '#000000'}`} />
                        </button>
                        <button className={`p-2 rounded-r-lg ${viewMode === 'grid' ? 'bg-primary' : 'bg-gray-300'}`} onClick={()=>setViewMode('grid')}>
                            <Grid color={`${viewMode === 'list' ? '#000000' : '#FFFFFF'}`}/>
                        </button>
                    </div>
                </div>
                <div onScroll={handleScroll} className="text-[#787878] max-h-96 min-h-96" id="listfileContainer">
                    {viewMode === 'list' ? (
                        <table className="w-full">
                            <thead className="text-left">
                                <tr>
                                    <th>Name</th>
                                    <th>Last Modified</th>
                                    <th>Size</th>
                                </tr>
                            </thead>
                            <tbody onContextMenu={handleContextMenu} className="h-full overflow-scroll">
                                {listFile.map((item:any, index:number)=>{
                                    return(
                                        <tr key={index} className={`fileItem-${index} select-none ${itemDragIn == item.file_id ? 'bg-blue-100' : ''} ${checkSelectedRowIds(item.file_id) ? 'bg-blue-200 hover:bg-opacity-10 hover:bg-blue-800' : 'hover:bg-opacity-10 hover:bg-gray-400'}`} data-id={item.file_id} data-file={getApiUrl()+item.url} data-is_folder={item.isFolder} data-object_type={item.status} 
                                            onClick={(e:any)=>{
                                                var temp:Array<string> = selectedRowIds
                                                if (item.status === "file") {
                                                    if (checkSelectedRowIds(item.file_id)) {
                                                        console.log(item.file_id)
                                                        // temp.push(item.file_id)
                                                        const index = temp.indexOf(item.file_id)
                                                        if (index !== -1) {
                                                            temp.splice(index, 1);
                                                        }
                                                        setSelectedRowIds([...temp])
                                                    } else {
                                                        temp.push(item.file_id)
                                                        console.log(temp, "temp...")
                                                        setSelectedRowIds([...temp])
                                                    }                                                    
                                                }

                                                console.log(item.file_id)
                                            // e.preventDefault()
                                            // e.stopPropagation()
                                            
                                            // console.log("dipilih")
                                            }} onTouchEnd={(e)=>{
                                                // e.stopPropagation()
                                                // contextMenu.hideAll()
                                            }}
                                            onMouseUp={(e)=>{
                                                // e.stopPropagation()
                                            }}
                                            onDragLeaveCapture={(e)=>{
                                                // setItemDragIn(null)
                                            }}
                                            onDragEnter={(e:any)=>{
                                                dragOverItem.current = item.file_id
                                                setItemDragIn(item.file_id)
                                                console.log(e.target.getAttribute('data-id'), item.file_id)
                                                // const element = e.target
                                                // element.addEventListener('addclas')
                                            }}
                                            onDragEnd={handleDropFile}
                                            onDoubleClick={()=>{
                                                if (item.status == "folder") {
                                                    setBreadCrumb(item.file_name)
                                                    setParentId(item.parent_id)
                                                    const selected = getSelectedFile(item.file_id)
                                                    handleReloadData(selected.file_id).then(()=>{
                                                        setSelectedFile(selected)
                                                    })                                                   
                                                } else {
                                                    if (parentId == "") {
                                                        setBreadCrumb("")
                                                    }
                                                    // setSelectedFile({
                                                    //     file_id:"",
                                                    //     file_name:null,
                                                    //     status:"file",
                                                    //     url:"",
                                                    //     mimeType:""
                                                    // })
                                                    const selected = getSelectedFile(item.file_id)
                                                    // console.log(selected)
                                                    setSelectedFile(selected)
                                                    // setBreadCrumb()
                                                    setTimeout(()=>{
                                                        setShowModalPreview(true)
                                                    }, 500)
                                                    // setSelectedFile(selected)
                                                    // console.log("do nothine")
                                                }
                                            }}
                                        >
                                            <td className="py-3 cursor-pointer" data-id={item.file_id} data-file={getApiUrl()+item.url} data-is_folder={item.isFolder} data-object_type={item.status} draggable={item.status === "folder" ? false : true}
                                                onDragStart={(e)=>{
                                                    dragItem.current = item.file_id
                                                    console.log(e, "drag dimulai")
                                                }}
                                                onDragEnd={(e)=>{
                                                    console.log(e, "drag diakhiri")
                                                }}
                                            >
                                                <div className="flex justify-start gap-3" data-id={item.file_id} data-file={getApiUrl()+item.url} data-is_folder={item.isFolder} data-object_type={item.status}>
                                                    <div className="text-center flex items-center justify-center" data-id={item.file_id} data-file={getApiUrl()+item.url} data-is_folder={item.isFolder} data-object_type={item.status}>
                                                        <FileTypeIcon 
                                                            fileType={item.mimeType}
                                                        />
                                                    </div>
                                                    <div>
                                                        {item.file_name}
                                                    </div>
                                                </div>
                                            </td>
                                            <td data-id={item.file_id} data-file={getApiUrl()+item.url} data-is_folder={item.isFolder} data-object_type={item.status}>{moment(item.updatedAt).format('DD-MM-YYYY HH:mm')}</td>
                                            <td data-id={item.file_id} data-file={getApiUrl()+item.url} data-is_folder={item.isFolder} data-object_type={item.status}>
                                                <div className="flex justify-between" data-id={item.file_id} data-object_type={item.status}>
                                                    <span>{item["fileSize"] ? parseFloat(item["fileSize"])  / 1000 +" Kb" : "-"}</span>
                                                    <button className="hover:bg-[#CCCCCC] rounded-full" data-id={item.file_id} data-object_type={item.status} data-is_folder={item.isFolder} onClick={(e)=>handleContextMenu(e)}><MoreVertical data-id={item.file_id} data-object_type={item.status} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <div className="grid grid-cols-4 gap-3" onContextMenu={handleContextMenu}>
                            {listFile.map((item:any, index:number)=>{
                                return(
                                    <div key={`${index}-grid`} className="overflow-hidden border-2 rounded-lg drop-shadow-md p-2 bg-white" data-id={item.file_id} data-file={getApiUrl()+item.url} data-is_folder={item.isFolder}
                                        data-object_type={item.status}
                                    >
                                        <div className="flex justify-between mb-2 items-center" data-id={item.file_id} data-file={getApiUrl()+item.url} data-is_folder={item.isFolder}
                                            data-object_type={item.status}
                                        >
                                            <h3 className="truncate h-8 p-1">{item.file_name}</h3>
                                            <button data-id={item.file_id} data-file={getApiUrl()+item.url} data-is_folder={item.isFolder} onClick={(e)=>handleContextMenu(e)}
                                                data-object_type={item.status}
                                            >
                                                <MoreVertical data-id={item.file_id} />
                                            </button>
                                        </div>
                                        <FilePreview fileType={item.mimeType} data={item} />
                                    </div>
                                )
                            })}
                        </div>
                    )}
                    {loading ? (
                    <div className="flex justify-center p-3">
                        <Loader className="animate-spin"/>
                    </div>
                    ) : null}

                    
                    <div className="flex justify-end p-3 hidden">
                        <button className="p-3 bg-primary text-white rounded drop-shadow-lg flex justify-center gap-1 font-bold"
                            onClick={(e)=>{
                                setShowModalUploadFile(true)
                            }}
                        >
                            <Plus fontWeight={"bold"} strokeWidth={4}/>
                            Upload
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-end p-3 fixed bottom-0 right-0">
                    <button className="p-3 bg-primary text-white rounded drop-shadow-lg flex justify-center gap-1 font-bold"
                        onClick={(e)=>{
                            setShowModalCreateFolder(true)
                        }}
                    >
                        <Plus fontWeight={"bold"} strokeWidth={4}/>
                        New Folder
                    </button>
                </div>

            <Menu id={MENU_ID}>
                <Item onClick={handleItemClick} id={'openFolder'}>
                    <div className="flex gap-2">
                        <Image src={"/open-folder-icon.png"} width={16} height={16} alt=""/>
                        <span>Open Folder</span>
                    </div>
                </Item>
            </Menu>
            <Menu id={MENU_ID2}>
                <Item onClick={handleItemClick} id={'preview'}>
                    <div className="flex gap-2">
                        <Image src={"/open-folder-icon.png"} width={16} height={16} alt=""/>
                        <span>Preview</span>
                    </div>
                </Item>
            </Menu>
            {showModalPreview ? <PreviewFile show={showModalPreview} onClose={()=>setShowModalPreview(false)} file={selectedFile} fileType={selectedFile.mimeType} /> : ''}
            
            <ModalCreateNewFolder show={showModalCreateFolder} onClose={()=>setShowModalCreateFolder(false)} handleSubmit={(name)=>handleCreateNewFolder(name)}/>
            <ModalUploadFile show={showModalUploadFile} onClose={()=>setShowModalUploadFile(false)} handleUpload={(payload:any)=>handleUpload(payload)} handleReloadData={()=>handleReloadData(selectedFile.file_id)}/>
            <ModalUploadProgress show={showModalUploadProgressFile} onClose={()=>setShowModalUploadProgressFile(false)} />
        </div>
    )
}


export default ListFileUserTable