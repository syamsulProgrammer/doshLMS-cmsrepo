import TableFileList from "@/components/table/fileList";
import Image from "next/image";
import Header from "@/components/header";
import axios from "axios";
import Content from "./content";
import { cookies } from "next/headers";
const API_URL = process.env.NEXT_PUBLIC_API_URL as string
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string
const getData = async ()=>{
  try {
    const listFile = await axios.get(API_URL+"/fileManager/index?limit=20&order=desc",{
      headers: {
        'Authorization': 'Bearer '+ cookies().get('token')?.value
      }
    })
    return listFile
  } catch (error) {
    throw error
  }
}

export default async function FileManagement() {
  var totalPage = 0
  var totalRow = 0
  var currentPage = 1
  var pagination = {
    totalPage: 0,
    totalRow:0
  }
  var card = {
    countAll: 0,
    total_media: 0,
    total_document: 0
  }
  const fileList = await getData().then(data=>{
    pagination = data.data.data.pagination
    card = data.data.data.card
    // throw {message:"Error"}
    return data.data.data.rows
  }).catch(err=>{
    console.error(err)
    throw err
  })
  const statistics = {
    totalFiles: 23,
    totalMedia: 19,
    totalDocuments: 4
  }
  return (
    <div className="flex flex-col px-10 h-screen overflow-hidden">
      <Header pageTitle={'File Manager'} />
      {/* <div className="w-full px-3 pb-3 grow flex relative"> */}
        <Content 
          rows={fileList}
          pagination={pagination}
          statistics={card}
        />
      {/* </div> */}
    </div>
  );
}
