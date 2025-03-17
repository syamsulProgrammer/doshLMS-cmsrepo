"use client"
import apiService from "@/apiService"
import StatusBadge from "@/components/badge/statusBadge"
import ChartBar from "@/components/charts/barChart"
import ChartBarHorizontal from "@/components/charts/barHorizontalChart"
import ChartDoughnut from "@/components/charts/doughnutChart"
import Leaderboard from "@/components/charts/leaderboard"
import SearchInput from "@/components/form/SearchInput"
import Header from "@/components/header"
import Pagination from "@/components/pagination"
import SessionDetailComponent from "@/components/sessions/detail"
import axios from "axios"
import { getCookie } from "cookies-next"
import { Field, Form, Formik } from "formik"
import moment from "moment"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp } from "react-feather"
import colorHelper from "../libs/colorHelpers"

interface Props{
  data: {
    scorePoints: {
      rows: Array<any>,
      pagination: any
    },
    session: {
      total:number,
      ongoing:number,
      completed:number
    },
    simulationDuration: {
      row: Array<any>,
      count: any
    }
    sessionHistory: Array<any>,
    sessionList: {
      rows: Array<any>,
      pagination: any
    },
    sceneStatistics: {
      row: Array<any>,
      count: any
    },
    userStatistics: Array<any>,
    leaderboards: Array<any>
  }
}

const Content = (props: Props)=>{
  const [sessionHistory, setSessionHistory] = useState(props.data.sessionHistory)
  const [sessionHistoryDuration, setSessionHistoryDuration] = useState("week")
  const [scorePoint, setScorePoint] = useState(props.data.scorePoints.rows)
  const [scorePointDuration, setScorePointDuration] = useState("week")
  const [testScorePointTotalPage, setTestScorePointTotalPage] = useState(props.data.scorePoints.pagination.totalPage)
  const [testScorePointTotalRow, setTestScorePointTotalRow] = useState(props.data.scorePoints.pagination.totalRow)
  const [testScorePointCurrentPage, setTestScorePointCurrentPage] = useState(1)
  const [testScorePointLimitPage, setTestScorePointLimitPage] = useState(4)
  const [simulationDurationList, setSimulationDurationList] = useState(props.data.simulationDuration)
  const [arrSimulationDuration, setArrSimulationDuration] = useState<any[]>([])
  const [simulationDuration,setSimulationDuration] = useState("week")
  const [sceneStatistics, setSceneStatistics] = useState(props.data.sceneStatistics)
  const [arrSceneStatistics, setArrSceneStatistics] = useState<any[]>([])
  const [sceneStatisticDuration, setSceneStatisticDuration] = useState("week")
  const [userStatistics, setUserStatistics] = useState(props.data.userStatistics)
  const [userStatisticDuration, setUserStatisticDuration] = useState("week")
  const [showDetailSession, setShowDetailSession] = useState(false)
  const [leaderboardList, setLeaderBoardList] = useState(props.data.leaderboards)
  const [leaderBoardDuration, setLeaderBoardDuration] = useState("week")
  const [detailSession, setDetailSession] = useState({})
  const [sessionList, setSessionList] = useState(props.data.sessionList.rows)
  const router = useRouter()
  const userSession = JSON.parse(getCookie("session_user") || "{}")
  const [sessionCurrentPage, setSessionCurrentPage] = useState(1)
  const [sessionTotalPage, setSessionTotalPage] = useState(props.data.sessionList.pagination.totalPage)
  const [sessionTotalRow, setSessionTotalRow] = useState(props.data.sessionList.pagination.totalRow)
  const [sessionOrder, setSessionOrder] = useState("desc")
  

  // setArrSceneStatistics(arraySceneStatistics)
  // setArrSceneStatistics(arraySceneStatistics)


  const handleSearchSession = async(text:string)=>{
    try {
      const data = await apiService.session.list(1,text)
      setSessionList(data.rows)     
      setSessionTotalPage(data.pagination.totalPage)
      setSessionTotalRow(data.pagination.totalRow) 
    } catch (error) {
      console.error(error)
    }
  }
  const handleShowSession = async(id:string)=>{
    try {
      const data = await apiService.session.detail(id)
      setDetailSession(data)
      setShowDetailSession(true)
      
    } catch (error) {
      console.error(error)
    }
  }

  const handleChangeDuration = async(type:string, duration:any)=>{
    switch (type) {
      case 'session_history':
        const data = await apiService.statistics.session_history(duration.value)
        setSessionHistory(data)
        break;
      case 'score_point':
        const scorePoint = await apiService.statistics.score_point(duration.value, 1, testScorePointLimitPage)
        setScorePoint(scorePoint.rows)
        setTestScorePointCurrentPage(1)
        setTestScorePointTotalPage(scorePoint.pagination.totalPage)
        setTestScorePointTotalRow(scorePoint.pagination.totalRow)
        break;
      case 'simulation_duration':
        const responseSimulationDuration = await apiService.statistics.simulation_duration(duration.value)
        setSimulationDurationList(responseSimulationDuration)
        var arraySimulationDuration:any[] = []
        if (responseSimulationDuration.row) {
          responseSimulationDuration.row.map((item:any)=>{
            arraySimulationDuration.push({
              name: item.scene_name,
              value: item.avg_time ? parseFloat(item.avg_time).toFixed(2) : 0
            })
          })
        }
        setArrSimulationDuration(arraySimulationDuration)
        console.log(arraySimulationDuration)
        break;
      case 'scene_statistic':
        const responseSceneStatistic = await apiService.statistics.scene_statistic(duration.value)
        
        var arraySceneStatistics:any[] = []
        // console.log(props.data.sceneStatistics)
        if (responseSceneStatistic.row) {
          responseSceneStatistic.row.map((item:any)=>{
            arraySceneStatistics.push({
              name: item.scene_name,
              value: item.avg_participant ? parseFloat(item.avg_participant).toFixed(2) : 0
            })
          })
          // console.log(arraySceneStatistics, "array scene statistics")
          setArrSceneStatistics(arraySceneStatistics)
        }
        // arraySceneStatistics = 
        // arraySceneStatistics = []
        // var arraySceneStatistics:Array<any> = []
        // console.log(props.data.sceneStatistics)
        // if (responseSceneStatistic.row) {
        //   responseSceneStatistic.row.map((item:any)=>{
        //     arraySceneStatistics.push({
        //       name: item.scene_name,
        //       value: parseFloat(item.avg_participant).toFixed(2)
        //     })
        //   })
        // }
        // setArrSceneStatistics(arraySceneStatistics || [])
        // console.log(responseSceneStatistic, "response perubahan waktu scene statistics")
        // if (responseSceneStatistic.row.length > 0) {
        //   responseSceneStatistic.row.map((item:any)=>{
        //     arraySceneStatistics.push({
        //       name: item.scene_name,
        //       value: parseFloat(item.avg_participant).toFixed(2)
        //     })
        //   })
        // }
        setSceneStatistics(responseSceneStatistic)
        break;
      case 'user_statistic':
        const responseUserStatistic = await apiService.statistics.user_active(duration.value)
        setUserStatistics(responseUserStatistic)
        break;
      case 'leaderboard':
        const responseLeaderboard = await apiService.statistics.leaderboard(duration.value)
        setLeaderBoardList(responseLeaderboard)
        break;
    
      default:
        break;
    }
  }

  useEffect(()=>{
    var arraySceneStatistics:any[] = []

    // console.log(props.data.sceneStatistics)
    if (sceneStatistics.row) {
      sceneStatistics.row.map((item:any)=>{
        arraySceneStatistics.push({
          name: item.scene_name,
          value: item.avg_participant ? parseFloat(item.avg_participant).toFixed(2) : 0
        })
      })
      setArrSceneStatistics(arraySceneStatistics)
    }

    var arraySimulationDuration:any[] = []
    if (simulationDurationList.row) {
      simulationDurationList.row.map((item:any)=>{
        arraySimulationDuration.push({
          name: item.scene_name,
          value: item.avg_time ? parseFloat(item.avg_time).toFixed(2) : 0
        })
      })
    }
    setArrSimulationDuration(arraySimulationDuration)
  },[sessionList])

  return(
    <div className="w-full px-10 pb-10">
      <Header pageTitle={'Dashboard'} />
        <div className="flex gap-5 w-full">
          <div className="flex flex-col grow gap-5">
            <div className="flex gap-5 w-full">
              <div className="bg-primary text-white w-1/3 rounded-lg p-5">
                <h2 className="text-center font-bold">Total Session</h2>
                <h3 className="text-center font-bold text-4xl">{props.data.session.total}</h3>
              </div>
              <div className="bg-white w-1/3 rounded-lg p-5">
                <h2 className="text-center font-bold">Ongoing</h2>
                <h3 className="text-center font-bold text-4xl text-warning">{props.data.session.ongoing}</h3>
              </div>
              <div className="bg-white w-1/3 rounded-lg p-5">
                <h2 className="text-center font-bold">Completed</h2>
                <h3 className="text-center font-bold text-4xl text-success">{props.data.session.completed}</h3>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-1/2 bg-white rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">Sessions History</h3>
                  <div>
                    <select className="border-gray-200 text-xs bg-gray-200 rounded-lg focus:ring-0 focus:ring-offset-0 focus:outline-none"
                      onClick={(e:any)=>{
                        const duration:string = e.target.value
                        handleChangeDuration('session_history', e.target)
                        setSessionHistoryDuration(duration)
                      }}
                    >
                      <option value="week">Past Week</option>
                      <option value="month">Past Month</option>
                    </select>
                  </div>
                </div>
                <div className="flex h-full items-center">
                  <ChartBar data={sessionHistory} duration={sessionHistoryDuration} />
                </div>
              </div>
              <div className="w-1/2 bg-white rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">Test Score Points</h3>
                  <div>
                    {/* <button className="text-xs bg-gray-200 rounded-lg p-1">Past Month</button> */}
                    <select className="border-gray-200 text-xs bg-gray-200 rounded-lg focus:ring-0 focus:ring-offset-0 focus:outline-none"
                      onClick={(e:any)=>{
                        const duration:string = e.target.value
                        handleChangeDuration('score_point', e.target)
                        setScorePointDuration(duration)
                      }}
                    >
                      <option value="week">Past Week</option>
                      <option value="month">Past Month</option>
                    </select>
                  </div>
                </div>
                <div className={`flex gap-3 flex-col text-white mt-3 md:min-h-64 sm:max-h-96 ${scorePoint.length < 3 ? "overflow-y-hidden" : "overflow-y-scroll"} overflow-x-hidden scrollbar-none`}>
                  {scorePoint && scorePoint.length > 0 ? scorePoint.map((item:any, index:number)=>{
                    return(
                      <div key={`scoreItem${index}`} className={`rounded w-full p-3 ${colorHelper.cardBg[index]}`}>
                        {item.scene_name}
                        <div className="flex justify-between">
                          <div className="text-xs">
                            AVG: {parseFloat(item.avg_task_complete).toFixed(1)}
                          </div>
                          <div className="text-xs">
                            Min: {parseFloat(item.min_task_complete).toFixed(1)}
                          </div>
                          <div className="text-xs">
                            Max: {parseFloat(item.max_task_complete).toFixed(1)}
                          </div>
                        </div>
                      </div>
                    )
                  }) : 
                      <div className="h-full p-5 bg-gray-100 w-full rounded-lg text-center flex items-center justify-center text-[#646464]">
                      No Data Found
                      </div>
                  }
                  {scorePoint && scorePoint.length > 0 ? (
                    <Pagination totalPage={testScorePointTotalPage} totalRow={testScorePointTotalRow} currentPage={testScorePointCurrentPage} handleChangePage={async(p)=>{
                     try {
                      const scorePoint = await apiService.statistics.score_point(scorePointDuration, p, testScorePointLimitPage)
                      setScorePoint(scorePoint.rows)
                      setTestScorePointCurrentPage(p)
                      setTestScorePointTotalPage(scorePoint.pagination.totalPage)
                      setTestScorePointTotalRow(scorePoint.pagination.totalRow)
                     } catch (error) {
                      console.error(error)
                     }
                    }} />
                  ) : null}
                </div>
              </div>
            </div>
            <div className="w-full bg-white rounded-lg p-3 overflow-y-scroll overflow-x-hidden grow  scrollbar-none">
              <div className="flex flex-col h-full">
                <Formik
                  initialValues={{
                    name: '',
                    search: ''
                  }}
                  onSubmit={async(values, {setSubmitting, setFieldError})=>{
                    handleSearchSession(values.search)
                  }}
                >
                  <Form>
                    <Field
                      type="text" className="rounded w-full focus:bg-white focus:ring-0 focus:ring-offset-0 focus:outline-none" placeholder="Search" name='search' 
                      component={SearchInput}
                    />
                    {/* <Field type="text" component={SearchInput}/> */}
                  </Form>
                </Formik>
                <div className="grow">
                  <table className="w-full text-[#646464]">
                    <thead>
                      <tr>
                        <th className="text-left">Session ID</th>
                        <th className="text-left flex gap-3 cursor-pointer w-[200px]" onClick={()=>{

                          if (sessionOrder === "asc") {
                            setSessionOrder("desc")
                            apiService.session.list(1, "", "desc").then(data=>{
                              setSessionList(data.rows)
                            })
                          } else {
                            setSessionOrder("asc")
                            apiService.session.list(1, "", "asc").then(data=>{
                              setSessionList(data.rows)
                            })
                          }

                        }}>Date {sessionOrder == "asc" ? (<ChevronDown width={14} strokeWidth={4}/>) : (<ChevronUp width={14} strokeWidth={4}/>)}</th>
                        <th className="text-left">Scene</th>
                        <th>Difficulty</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody className="overflow-scroll overflow-x-hidden" style={{
                      overflowY: 'scroll'
                    }}>
                      {sessionList.map((item:any, index:number)=>{
                        return(
                          <tr key={index} className="cursor-pointer" onClick={()=>handleShowSession(item.session_id)}>
                            <td className="text-left">{item.session_name}</td>
                            <td className="text-left"><span>{moment(parseFloat(item.start_date)).format('DD MMM YYYY, hh:mm:ss')}</span></td>
                            <td className="text-left">{item.scene_name}</td>
                            <td className="text-center">{item.difficulty_level}</td>
                            <td className="text-center"><StatusBadge name={item.status} /></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                {sessionTotalPage > 1 ? (
                  <Pagination currentPage={sessionCurrentPage} totalPage={sessionTotalPage} totalRow={sessionTotalRow} handleChangePage={(page)=>{
                    apiService.session.list(page, "", sessionOrder).then(data=>{
                      setSessionList(data.rows)
                      setSessionCurrentPage(page)
                    })
                  }}/>
                ) : null}
              </div>
            </div>
          </div>
          <div className="w-96 flex flex-col gap-5">
            <div className="bg-white rounded-lg p-3">
              <div className="flex justify-between">
                <h2 className="font-bold">Simulation Duration</h2>
                <div>
                  <select className="border-gray-200 text-xs bg-gray-200 rounded-lg focus:ring-0 focus:ring-offset-0 focus:outline-none"
                      onClick={(e:any)=>{
                        const duration:string = e.target.value
                        handleChangeDuration('simulation_duration', e.target)
                        setSimulationDuration(duration)
                      }}
                    >
                    <option value="week">Past Week</option>
                    <option value="month">Past Month</option>
                  </select>
                </div>
              </div>
              <div className="">
                <ChartDoughnut data={
                  arrSimulationDuration
                }
                labelUnit=""
                footerStatistic={[{
                  title: 'Average Session Duration',
                  value: simulationDurationList.count.avg_time
                },{
                  title: 'Longest Session Duration',
                  value: simulationDurationList.count.max_time
                },{
                  title: 'Shortest Session Duration',
                  value: simulationDurationList.count.min_time
                }]}
                />
              </div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="flex justify-between">
                <h2 className="font-bold">Scene Statistics</h2>
                <div>
                  <select className="border-gray-200 text-xs bg-gray-200 rounded-lg focus:ring-0 focus:ring-offset-0 focus:outline-none"
                      onClick={(e:any)=>{
                        const duration:string = e.target.value
                        handleChangeDuration('scene_statistic', e.target)
                        setSceneStatisticDuration(duration)
                      }}
                    >
                    <option value="week">Past Week</option>
                    <option value="month">Past Month</option>
                  </select>
                </div>
                {/* <button className="text-xs bg-gray-200 rounded-lg p-1">Past Month</button> */}
              </div>
              <div className="">
                <ChartDoughnut data={arrSceneStatistics}
                  labelUnit=""
                  footerStatistic={[{
                    title: 'Most Played Scene',
                    value: sceneStatistics.count.most_played
                  },{
                    title: 'Least Played Scene',
                    value: sceneStatistics.count.least_played
                  }]}
                  />
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 flex flex-col">
              <div className="flex justify-between">
                <h2 className="font-bold">Leaderboards</h2>
                <div className="">
                  <select className="border-gray-200 text-xs bg-gray-200 rounded-lg focus:ring-0 focus:ring-offset-0 focus:outline-none"
                      onClick={(e:any)=>{
                        const duration:string = e.target.value
                        handleChangeDuration('leaderboard', e.target)
                        setLeaderBoardDuration(duration)
                      }}
                    >
                    <option value="week">Past Week</option>
                    <option value="month">Past Month</option>
                  </select>
                </div>
              </div>
              <div className="">
                <Leaderboard data={leaderboardList} />
              </div>
            </div>
            {userSession.role === "administrator" ? (
              <div className="bg-white rounded-lg p-3 flex flex-col">
                <div className="flex justify-between">
                  <h2 className="font-bold">User Statistics</h2>
                  <div className="">
                    <select className="border-gray-200 text-xs bg-gray-200 rounded-lg focus:ring-0 focus:ring-offset-0 focus:outline-none"
                        onClick={(e:any)=>{
                          const duration:string = e.target.value
                          handleChangeDuration('user_statistic', e.target)
                          setUserStatisticDuration(duration)
                        }}
                      >
                      <option value="week">Past Week</option>
                      <option value="month">Past Month</option>
                    </select>
                  </div>
                </div>
                <div className="h-fit">
                    <ChartBarHorizontal data={userStatistics || []} />
                </div>
              </div>
            ) : (
              null
            )}
          </div>
        </div>
        {showDetailSession ? (
          <SessionDetailComponent show={showDetailSession} onClose={()=>setShowDetailSession(false)} data={detailSession} />
        ) : null}
      </div>
  )
}

export default Content