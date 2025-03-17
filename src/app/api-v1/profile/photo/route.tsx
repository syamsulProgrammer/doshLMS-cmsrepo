import axios from "axios"
const API_URL = process.env.NEXT_PUBLIC_API_URL as string
export async function PUT(request: Request) {
  try {
    const payload = request
    
    const response = await axios.put(API_URL+'/profile/photo', payload, {
      headers: {
        'Authorization':`Bearer ${request.headers.get('authorization')}`,
        'Content-Type': 'multipart/form-data',
        "Accept-Encoding": "gzip,deflate,compress"
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