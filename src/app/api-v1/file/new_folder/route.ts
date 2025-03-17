import { get_random_array } from "@/helpers/string"
import { faker } from "@faker-js/faker"
import axios from "axios"
import { NextRequest } from "next/server"
const API_URL = process.env.NEXT_PUBLIC_API_URL as string
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    return await axios.post(API_URL+'/fileManager/user/folder',{
        "folder_name": body.name
    },{
      headers: {
        'Authorization': `Bearer ${request.headers.get('authorization')}`
      }
    }).then(data=>{
      return Response.json({
        status:"Success",
        data: data.data.data
      })
    }).catch(err=>{
      throw err
    })
  } catch (error: any) {
    return Response.json({
      status:"Error",
      message: error.message || "Unknown Error"
    },{
      status: 400
    })
  }  
}