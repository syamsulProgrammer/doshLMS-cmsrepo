"use client"
import { ChevronDown, ChevronUp, Edit, Eye, Filter, MoreVertical, Plus, Trash } from "react-feather"
import ModalAddUser from "../modals/users/addUser"
import { useState } from "react"
import ModalEditUser from "../modals/users/editUser"
import ModalDetailUser from "../modals/users/detailUser"
import { Menu, Item, Separator, Submenu, useContextMenu } from 'react-contexify';
import 'react-contexify/ReactContexify.css';
import Image from "next/image"
import axios from "axios"
import ConfirmationModal from "../modals/confirmation/confirmation"

const MENU_ID = 'menu1';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Field, Form, Formik } from "formik"
import apiService from "@/apiService"
import Pagination from "../pagination"
import SearchInput from "../form/SearchInput"
import ModalFileUser from "../modals/file/fileUser"
const MySwal = withReactContent(Swal)

interface Props{
  data: any
}

const TableUserList = (props:Props)=>{
  // console.log(props.data)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRow, setTotalRow] = useState(props.data.pagination.totalRow)
  const [totalPage, setTotalPage] = useState(props.data.pagination.totalPage)
  const [listUser, setListUser] = useState(props.data.rows)
  const [userOrder, setUserOrder] = useState("desc")
  const [showModalAddUser, setShowModalAddUser] = useState(false)
  const [showModalEditUser, setShowModalEditUser] = useState(false)
  const [showModalDetailUser, setShowModalDetailUser] = useState(false)
  const [showModalFileUser, setShowModalFileUser] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState('')
  const [selectedData, setSelectedData] = useState({
    id: '',
    username: '',
    fullName: '',
    email: '',
    workerId:'',
    password:'',
    photo: ''
  })
  
  const [userFiles, setUserFiles] = useState({
    rows: [],
    pagination: {},
    card: {}
  })

  const handleChangePage = async(page:number)=>{
    try {
      setCurrentPage(page)
      const response = await apiService.users.list(page, 10, "", userOrder)
      setListUser(response.rows)
    } catch (error) {
      throw error
    }
  }
  const handleReloadData = async ()=>{
    try {
      const response = await apiService.users.list()
      setListUser(response.rows)
    } catch (error) {
      throw error
    }
  }
  async function handleItemClick(props:any){
      switch (props.id) {
        case 'edit':
          apiService.users.getUserById(props.props.userId).then(data=>{
            setShowModalEditUser(true)
            setSelectedData(data)
          }).catch(error=>{
            console.log(error)
          })
          // axios.get('/api/user/'+props.props.userId).then(data=>{
          //   console.log(data, "data dari api")
          //   setShowModalEditUser(true)
          //   setSelectedData(data.data.data)

          // }).catch(err=>{

          // })
          break;
        case 'delete':
          MySwal.fire({
            title: 'Confirmation',
            text: 'Are you sure want to delete this user?',
            customClass: {
              actions: 'flex gap-3',
              confirmButton: 'bg-primary p-3 rounded-lg w-48',
              cancelButton: 'bg-danger p-3 rounded-lg w-48'
            },
            buttonsStyling: false,
            showCancelButton: true,
            reverseButtons: true
          }).then(()=>{
            apiService.users.deleteUserById(props.props.userId).then(data=>{
              handleReloadData()
            }).catch(err=>{
              throw err
            })
            // axios.delete('/api/user/'+props.props.userId).then(data=>{
            //   console.log(data, "data dari api")
            // }).catch(err=>{
            //   throw err
            // })
          }).catch((error)=>{
            alert(error)
          })


          break;
        case 'viewFile':
          apiService.fileManager.list(1, 20, "", "all", props.props.userId) .then(data=>{
            setShowModalFileUser(true)
            setUserFiles(data)
            // setSelectedData(data)
          }).catch(error=>{
            console.log(error)
          })
          // axios.get('/api/user/'+props.props.userId).then(data=>{
          //   console.log(data, "data dari api")
          //   setShowModalEditUser(true)
          //   setSelectedData(data.data.data)

          // }).catch(err=>{

          // })
          break;
      
        default:

          break;
      }
  }
  const { show } = useContextMenu({
    id: MENU_ID,
});
  function handleContextMenu(event:any, userId:string){
    setSelectedUserId(userId)
    show({
        id: MENU_ID,
        event,
        position: {
          x: event.clientX - 220,
          y: event.clientY + 10
        },
        props: {
            userId: userId
        }
    })
}

const handleSearchUser = async(text:string)=>{
  try {
      const data = await apiService.users.list(1,20, text)
      setListUser(data.rows)      
      setCurrentPage(1),
      setTotalPage(data.pagination.totalPage)
      setTotalRow(data.pagination.totalRow)
    } catch (error) {
      console.error(error)
    }
}
    return(
        <div className="flex flex-col h-full">
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between mb-3 gap-3">
                  {/* <div className="w-full flex gap-3"> */}
                    <Formik
                      initialValues={{
                        searchKey: ''
                      }}
                      onSubmit={(values, {resetForm})=>{
                        // resetForm()
                        handleSearchUser(values.searchKey)
                      }}
                    >
                      <Form className="grow">
                        <Field 
                          type="text"
                          placeholder="Search"
                          name="searchKey"
                          className="grow rounded-lg w-full focus:bg-white focus:ring-0 focus:ring-offset-0 focus:outline-none"
                          component={SearchInput}
                        />
                      </Form>
                    </Formik>
                    <button className="bg-primary font-bold text-white p-2 rounded-lg flex gap-1"
                      onClick={()=>{
                        // console.log('show modal add user')
                        setShowModalAddUser(true)
                      }}
                    >
                      <Plus width={16} strokeWidth={3} /> New User
                    </button>
                  {/* </div> */}
                </div>
                <div className="grow h-full">
                  <table className="w-full text-[#787878] grow">
                    <thead>
                      <tr>
                        <th className="text-left">Name</th>
                        <th className="text-left flex gap-3 cursor-pointer w-[200px]" onClick={()=>{
                          if (userOrder === "asc") {
                            setUserOrder("desc")
                            apiService.users.list(1, 10, "", "desc").then(response=>{
                              setListUser(response.rows)
                            })
                          } else {
                            setUserOrder("asc")
                            apiService.users.list(1, 10, "", "asc").then(response=>{
                              setListUser(response.rows)
                            })
                          }
                        }}>Last Activity {userOrder == "asc" ? (<ChevronDown width={14} strokeWidth={4}/>) : (<ChevronUp width={14} strokeWidth={4}/>)}</th>
                        <th className="text-left">Username</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {listUser.map((item:any)=>{
                        return(
                          <tr key={item.id}>
                            <td>{item.fullName}</td>
                            <td>{item.lastUpdate}</td>
                            <td>{item.username}</td>
                            <td>
                              <div className="flex justify-end">
                                <button
                                  onClick={(e)=>handleContextMenu(e, item.id)}
                                >
                                  <MoreVertical />
                                </button>
                              </div>
                                {/* <div className="flex justify-center gap-2">
                                    <button
                                        onClick={()=>setShowModalDetailUser(true)}
                                    ><Eye width={16} className="text-green-700" /></button>
                                    <button
                                        onClick={()=>setShowModalEditUser(true)}
                                    ><Edit width={16} className="text-orange-500" /></button>
                                    <button><Trash width={16} className="text-red-700" /></button>
                                </div> */}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                {totalPage > 1 ? (
                  <Pagination totalRow={totalRow} totalPage={totalPage} currentPage={currentPage} handleChangePage={(page)=>handleChangePage(page)} />
                ) : null}

              </div>
              {/* <div className="flex justify-end mt-3"> */}
                
              {/* </div> */}
            </div>
            <Menu id={MENU_ID}>
              <Item onClick={handleItemClick} id={'viewFile'}>
                  <div className="flex gap-2">
                      <Image src={"/icon-folder.png"} width={16} height={16} alt=""/>
                      <span>View Uploaded File</span>
                  </div>
              </Item>
              <Separator />
              <Item onClick={handleItemClick} id={'edit'}>
                  <div className="flex gap-2">
                      <Image src={"/icon-rename.png"} width={16} height={16} alt=""/>
                      <span>Edit</span>
                  </div>
              </Item>
              <Separator />
              <Item onClick={handleItemClick} id={'delete'}>
                  <div className="flex gap-2">
                      <Image src={"/icon-trash.png"} width={16} height={16} alt=""/>
                      <span>Remove</span>
                  </div>
              </Item>
          </Menu>
            <ModalAddUser show={showModalAddUser} onClose={()=>{
              setShowModalAddUser(false)
              setCurrentPage(1)
              handleReloadData()
            }} />
            <ModalEditUser show={showModalEditUser} userId={selectedUserId} data={selectedData} 
              onClose={()=>{
                setShowModalEditUser(false)
                handleReloadData()
              }} />
            <ModalDetailUser show={showModalDetailUser} onClose={()=>setShowModalDetailUser(false)}/>
            <ModalFileUser show={showModalFileUser} onClose={()=>setShowModalFileUser(false)} files={userFiles} userId={selectedUserId}/>
        </div>
    )
}


export default TableUserList