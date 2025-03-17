import axios from "axios"
const API_URL = process.env.NEXT_PUBLIC_API_URL as string
export async function GET(request: Request) {
  try {
    // const payload = await request.json()
    const response = await axios.get(API_URL+'/profile', {
      headers: {
        'Authorization':`Bearer ${request.headers.get('authorization')}`
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