import jwtHelpers from "@/helpers/jwt"
import { getCookie, getCookies } from "cookies-next"
import { NextRequest } from "next/server"
const cookieOptions = {
    sameSite: true
  }
const isAuthenticated = (request: NextRequest)=>{
    // console.log(request.cookies.get('isAuthed'), "check auth")
    // console.log(getCookies())
    if (request.cookies.get('isAuthed')?.value === 'true') {
        return true
    } else {
        return false
    }
}

const checkAuthDummy = async (payload: any)=>{
    try {
        const dummyUser = [{
            username: 'admin',
            password: 'admin',
            role: 'admin'
          }, {
            username: 'user',
            password: 'user',
            role: 'user'
          }]
        const exist = dummyUser.find((v)=>v.username === payload.username)
        if (exist) {
            return {
                username: payload.username,
                token: await jwtHelpers.generateToken(payload.username, exist.role)
            }            
        } else {
            throw {
                message: 'User not found'
            }
        }

    } catch (error:any) {
        throw {
            message: error.message || 'Unknown Error'
        }
    }
}


export {
    isAuthenticated,
    checkAuthDummy
}