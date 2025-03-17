import axios from "axios"
const API_URL = process.env.NEXT_PUBLIC_API_URL as string
export async function POST(request: Request) {
  try {
    const payload = await request.formData()
    const response = await axios.put(API_URL+'/profile/edit', payload, {
      headers: {
        'Authorization':`Bearer ${request.headers.get('authorization')}`,
        'Content-Type': "multipart/form-data",
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