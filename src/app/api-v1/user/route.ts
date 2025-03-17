import axios from "axios"
import { NextRequest } from "next/server"
const API_URL = process.env.NEXT_PUBLIC_API_URL as string
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const search:any = searchParams.get('search') || ""
    const page:any = searchParams.get('page') || ""
    const order:any = searchParams.get('order') || ""
    var objParam:any = {}
    if (search && search != undefined) {
        objParam['search'] = searchParams.get('search')
    }
    if (order && order != undefined) {
      objParam['order'] = searchParams.get('order')
  }
    if (page) {
        objParam['page'] = searchParams.get('page')
    }
    const params = new URLSearchParams(objParam).toString();
    return await axios.get(API_URL+'/users/admin?'+params,{
      headers: {
        'Authorization':`Bearer ${request.headers.get('authorization')}`
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