"use server"
import axios from "axios";
import TableUserList from "@/components/table/userList";
import Header from "@/components/header";
import { cookies, headers } from "next/headers";
// import apiService from "@/apiService";
const API_URL = process.env.NEXT_PUBLIC_API_URL as string
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string

const env = process.env['NODE_ENV']

async function getData() {
  try {
    const tokenCookie = cookies().get('token')?.value
    const res = await axios.get(`${API_URL}/users/admin`, {
      headers: {
          'Authorization': `Bearer ${tokenCookie}`
      }
    })
    return res.data.data
  } catch (error) {
    throw error
  }
}

export default async function User() {
  try {
    const data =  await getData()
    const listUser = data
    return (
      <div className="flex flex-col px-10 h-screen">
        <Header pageTitle={'User Management'} />
        <div className="grow pt-0 pb-3 relative">
          <div className="bg-white h-full rounded-lg p-3">
            <TableUserList data={listUser} />
          </div>
        </div>
      </div> 
    );
  } catch (error) {
    throw error
  }
}