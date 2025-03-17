import { get_random_array } from "@/helpers/string"
import { faker } from "@faker-js/faker"
import axios from "axios"
import moment from "moment"
import { NextRequest } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL as string
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string

export async function GET(request: NextRequest){
    try {
        
        var endDate = moment().format('YYYY-MM-DD')
        var startDate = moment().subtract(1, 'month').format('YYYY-MM-DD')

        if (request.nextUrl.searchParams.get('duration') === 'week') {
            startDate = moment().subtract(7, 'days').format('YYYY-MM-DD')
        }
        
        const results =  await axios.get(API_URL+'/dashboard/index/scene_play?start_date='+startDate+'&end_date='+endDate,{
            headers: {
              'Authorization':`Bearer ${request.headers.get('authorization')}`
            }
        })

        return Response.json({
            status:"success",
            data: results.data.data
        })
    } catch (error:any) {
        return Response.json({
            status:"Error",
            message: error.message || "Unknown Error"
        },{
            status: 400
        })
    }
}