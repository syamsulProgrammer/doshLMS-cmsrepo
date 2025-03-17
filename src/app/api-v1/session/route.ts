import { get_random_array } from "@/helpers/string"
import { faker } from "@faker-js/faker"
import axios from "axios"
import { NextRequest } from "next/server"
const API_URL = process.env.NEXT_PUBLIC_API_URL as string
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const search:any = searchParams.get('search') || ""
    const page:any = searchParams.get('page') || ""
    const order:any = searchParams.get('order') || ""
    var objParam:any = {}
    if (search) {
        objParam['search'] = searchParams.get('search')
    }
    if (order) {
      objParam['order'] = searchParams.get('order')
  }
    if (page) {
        objParam['page'] = searchParams.get('page')
    }
    const params = new URLSearchParams(objParam).toString();
    return await axios.get(API_URL+'/sessions/index/list?'+params,{
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