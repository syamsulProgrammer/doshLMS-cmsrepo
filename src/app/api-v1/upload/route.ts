const cookieOptions = {
  sameSite: true
}
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("file") as File[];
    const response = await Promise.all(
      files.map(async (file) => {
        // not sure why I have to override the types here
        const Body = (await file.arrayBuffer()) as Buffer;
      })
    );
  
    return Response.json({
        status:"Success",
        message: "Data Berhasil diupload"
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