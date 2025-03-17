import { get_random_array } from "@/helpers/string"
import { faker } from "@faker-js/faker"
import axios from "axios"
const API_URL = process.env.NEXT_PUBLIC_API_URL as string
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    return await axios.get(API_URL+'/sessions/index/detail/'+params.id,{
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