import { checkAuthDummy } from "@/lib/auth"
import { setCookie } from "cookies-next"
import { getRandomValues, randomUUID } from "crypto"
import { faker } from "@faker-js/faker"
import axios from "axios"
const cookieOptions = {
  sameSite: true
}
const API_URL = process.env.NEXT_PUBLIC_API_URL as string
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string

export async function POST(request: Request) {
  try {
    const payload = await request.formData()
    return await axios.post(API_URL+'/fileManager/user', payload,{
      headers: {
        'Content-Type':'multipart/form-data',
        'Authorization':`Bearer ${request.headers.get('authorization')}`,
      }}).then(data=>{
        return Response.json({
            status:"Success",
            data: data.data.data
        })
      }).catch(err=>{
        return Response.json({
          status:"Error",
          message: err.message || "Unknown Error"
        },{
          status: 400
        })
      })
    }  catch (error: any) {
      return Response.json({
        status:"Error",
        message: error.message || "Unknown Error"
      },{
        status: 400
      })
    }
}