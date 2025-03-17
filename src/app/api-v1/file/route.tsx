import { checkAuthDummy } from "@/lib/auth"
import { setCookie } from "cookies-next"
import { getRandomValues, randomUUID } from "crypto"
import { faker } from "@faker-js/faker"
import axios from "axios"
import { NextRequest } from "next/server"
const cookieOptions = {
  sameSite: true
}
const API_URL = process.env.NEXT_PUBLIC_API_URL as string
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const search:any = searchParams.get('search') || ""
    const page:any = searchParams.get('page') || ""
    const limit:any = searchParams.get('limit') || 20
    const category:any = searchParams.get('category') || ""
    const parentId:any = searchParams.get('parentId') || ""
    const userId:any = searchParams.get('userId') || ""
    const order:any = searchParams.get('order') || ""
    const orderKey:any = searchParams.get('orderKey') || ""
    var objParam:any = {}
    if (search) {
        objParam['search'] = searchParams.get('search')
    }
    if (order) {
      objParam['order'] = searchParams.get('order')
  }
  if (orderKey) {
    objParam['orderKey'] = searchParams.get('orderKey')
}
    if (page) {
        objParam['page'] = searchParams.get('page')
    }
    if (category) {
      objParam['category'] = searchParams.get('category')
    }
    if (parentId) {
      objParam['parentId'] = searchParams.get('parentId')
    }
    if (limit) {
      objParam['limit'] = limit
    }
    if (userId) {
      objParam['userId'] = userId
    }
    const params = new URLSearchParams(objParam).toString();
    return await axios.get(API_URL+'/fileManager/index?'+params,{
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