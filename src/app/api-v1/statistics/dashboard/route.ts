import { get_random_array } from "@/helpers/string"
import { faker } from "@faker-js/faker"
import axios from "axios"
import moment from "moment"

const API_URL = process.env.NEXT_PUBLIC_API_URL as string
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string

export async function GET(request: Request){
    try {
        var endDate = moment().format('YYYY-MM-DD')
        var startDate = moment().subtract(6, 'days').format('YYYY-MM-DD')
        const cards = await axios.get(API_URL+'/dashboard/index/card',{
            headers: {
              'Authorization':`Bearer ${request.headers.get('authorization')}`
            }
        })
        
        const sessionHistory =  await axios.get(API_URL+'/dashboard/index/session_history?start_date='+startDate+'&end_date='+endDate,{
            headers: {
              'Authorization':`Bearer ${request.headers.get('authorization')}`
            }
        })

        const scorePoints =  await axios.get(API_URL+'/dashboard/index/score_point?start_date='+startDate+'&end_date='+endDate+'&limit=2',{
            headers: {
              'Authorization':`Bearer ${request.headers.get('authorization')}`
            }
        })

        // console.log(scorePoints, "scorepoints")

        const simulationDuration =  await axios.get(API_URL+'/dashboard/index/duration?start_date='+startDate+'&end_date='+endDate,{
            headers: {
              'Authorization':`Bearer ${request.headers.get('authorization')}`
            }
        })
        // console.log(simulationDuration.data.data, "simdur")

        const sessionList =  await axios.get(API_URL+'/sessions/index/list?start_date='+startDate+'&end_date='+endDate,{
            headers: {
              'Authorization':`Bearer ${request.headers.get('authorization')}`
            }
        })

        const sceneStatistics =  await axios.get(API_URL+'/dashboard/index/scene_play?start_date='+startDate+'&end_date='+endDate,{
            headers: {
              'Authorization':`Bearer ${request.headers.get('authorization')}`
            }
        })

        const leaderboards =  await axios.get(API_URL+'/dashboard/index/leaderboard?start_date='+startDate+'&end_date='+endDate,{
            headers: {
              'Authorization':`Bearer ${request.headers.get('authorization')}`
            }
        })

        const userStatistics =  await axios.get(API_URL+'/dashboard/index/user_active?start_date='+startDate+'&end_date='+endDate,{
            headers: {
              'Authorization':`Bearer ${request.headers.get('authorization')}`
            }
        })

        // console.log(leaderboards.data.data, "leaderboards")

        // var sessionList:any = {}

        return Response.json({
            status:"success",
            data: {
                session: {
                    total: cards.data.data.total_session,
                    ongoing: cards.data.data.total_in_progress,
                    completed: cards.data.data.total_completed
                },
                sessionHistory: sessionHistory.data.data,
                scorePoints: scorePoints.data.data,
                simulationDuration: simulationDuration.data.data,
                sessionList: sessionList.data?.data || [],
                sceneStatistics: sceneStatistics.data?.data || [],
                leaderboards: leaderboards.data.data || [],
                userStatistics: userStatistics.data.data || []
            }
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