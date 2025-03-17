import axios from "axios"
const API_URL = process.env.NEXT_PUBLIC_API_URL as string
export async function POST(request: Request) {
  try {
    // console.log(request.formData())
    const payload = await request.formData()
    const response = await axios.post(API_URL+'/users/admin', payload, {
      headers: {
        'Authorization':`Bearer ${request.headers.get('authorization')}`,
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