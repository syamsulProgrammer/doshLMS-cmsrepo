import axios from "axios"
import { getCookie } from "cookies-next"
import { cookies } from "next/headers"
// import { cookies } from "next/headers"
const API_URL = process.env.NEXT_PUBLIC_API_URL as string
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string

export async function GET(request: Request) {
  try {
    return await axios.get(API_URL+'/users/admin/profile/data',{
      headers: {
        'Authorization':`Bearer ${request.headers.get('authorization')}`
      }
    }).then(data=>{
        cookies().set('session_user', JSON.stringify(data.data.data))
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