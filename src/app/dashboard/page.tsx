"use server"
import Header from "@/components/header";
import Image from "next/image";
// import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";

import Link from "next/link";
import ChartBar from "@/components/charts/barChart";
import axios from "axios";
import ChartDoughnut from "@/components/charts/doughnutChart";
import SessionDetailComponent from "@/components/sessions/detail";
import Content from "./content";
import apiService from "@/apiService";
import { getCookies } from "cookies-next";
import { faker } from "@faker-js/faker";
import moment from "moment";
import { get_random_array } from "@/helpers/string";
import { cookies } from "next/headers";
// import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string

async function fetchData(){
  try {
    const res = await axios.get(BASE_URL+'/api-v1/statistics/dashboard',{
      headers: {
        'Authorization': cookies().get('token')?.value
      }
    })
    // return res.data.data
    // return {
      // status:"success",
      // const sessionList = await axios.get(API_URL+"/")
      // console.log(res.data.data.scorePoints, "scorePoints")
      // console.log(res.data.data.scorePoints)
    return {
          session: {
              total: res.data.data.session.total,
              ongoing: res.data.data.session.ongoing,
              completed: res.data.data.session.completed
          },
          sessionHistory: res.data.data.sessionHistory,
          scorePoints: res.data.data.scorePoints,
          simulationDuration: res.data.data.simulationDuration,
          sessionList: res.data.data.sessionList,
          sceneStatistics: res.data.data.sceneStatistics,
          userStatistics: res.data.data.userStatistics || [],
          leaderboards: res.data.data.leaderboards
    }
  } catch (error) {
    // console.log(error)
    throw error
  }
}

export default async function Home() {
  // props.pageTitle = 'Dashboard'
  const data = await fetchData()
  const pageName = 'Dashboard'
  
  return (
    <div>
      
      <Content data={data} />
    </div>
  );
}
