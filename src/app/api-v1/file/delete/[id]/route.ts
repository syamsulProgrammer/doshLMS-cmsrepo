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

export async function DELETE(request: Request, params:any) {
  try {
    const id = params.params.id
    return await axios.delete(API_URL+'/fileManager/user/'+id,{
      headers: {
        'Authorization':`Bearer ${request.headers.get('authorization')}`
      }}).then(data=>{
        return Response.json({
            status:"Success",
            data: data.data.data
        })
      }).catch(err=>{
        throw err
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