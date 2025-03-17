import axios from "axios"
import { headers } from "next/headers"

const API_URL = process.env.NEXT_PUBLIC_API_URL as string
export async function POST(request: Request) {
  try {
    const payload = await request.json()
    return await axios.post(API_URL+'/auth/login',{
      username: payload.username,
      password: payload.password
    }).then((data=>{
      return Response.json({
        status:"Success",
        data: {
          accessToken: data.data.data.accessToken,
          refreshToken: data.data.data.refreshToken
        }
      })
    })).catch(err=>{
      throw {
        message: err.response.data.message || err.message
      }
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