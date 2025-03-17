import { faker } from "@faker-js/faker"
import axios from "axios"
const API_URL = process.env.NEXT_PUBLIC_API_URL as string
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    return await axios.get(API_URL+'/users/admin/'+params.id,{
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

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const payload = await request.formData()
    console.log(request)
    const response = await axios.put(API_URL+'/users/admin/'+params.id, payload, {
      headers: {
        'Authorization': `Bearer ${request.headers.get('authorization')}`,
        'Content-Type':'multipart/form-data'
      }
    })
    return Response.json({
      status:"Success",
      data: response.data.data
    })
  } catch (error: any) {
    console.log(error)
    return Response.json({
      status:"Error",
      message: error.message || "Unknown Error"
    },{
      status: 400
    })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const response = await axios.delete(API_URL+'/users/admin/'+params.id, {
      headers: {
        'Authorization': `Bearer ${request.headers.get('authorization')}`
      }
    })
    return Response.json({
      status:"Success",
      data: response.data.data
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