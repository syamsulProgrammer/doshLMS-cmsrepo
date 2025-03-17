import { get_random_array } from "@/helpers/string"
import { faker } from "@faker-js/faker"
import axios from "axios"
const API_URL = process.env.NEXT_PUBLIC_API_URL as string
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const payload = await request.json()
    return await axios.post(API_URL+'/fileManager/user/folder/'+params.id,{
        file_name: payload.file_name
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