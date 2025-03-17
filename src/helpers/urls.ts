const API_URL = process.env.NEXT_PUBLIC_API_URL as string
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string

export const getBaseUrl =()=>{
    return BASE_URL
}

export const getApiUrl =()=>{
    return API_URL
}