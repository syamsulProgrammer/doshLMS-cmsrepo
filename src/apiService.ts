"use client"
import axios from "axios"
import { getCookie, getCookies, setCookie } from "cookies-next"

const API_URL = process.env.NEXT_PUBLIC_API_URL as string
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string
const cookiesStored = getCookies()
const cookieOptions:any = {
    sameSite: true
}
const userSession = JSON.parse(getCookie('user_token') || "{}")
const apiService = {
    login: async(payload:any)=>{
        try {
            return await axios.post(BASE_URL+'/api-v1/auth/login',{
                username: payload.username,
                password: payload.password
            }).then((data=>{
                setCookie('refreshToken', data.data.data.refreshToken, cookieOptions)
                setCookie('token', data.data.data.accessToken, cookieOptions)
                setCookie('isAuthed', true, cookieOptions)
                return {
                    data:data.data.data
                }
            })).catch(err=>{
                throw {
                    message: err.response.data.message || err.message
                }
            })
        } catch (error:any) {
            throw error
        }
    },
    auth: {
        register: async(payload:any)=>{
            try {
                return await axios.post(BASE_URL+'/api-v1/auth/register',payload).then((data=>{
                    return {
                        data:data.data.data
                    }
                })).catch(err=>{
                    throw {
                        message: err.response.data.message || err.message
                    }
                })
            } catch (error:any) {
                throw error
            }
        },
        checkToken: async(token:string)=>{
            try {
                return await axios.get(BASE_URL+'/api-v1/auth/checkToken', {
                    headers: {
                        'Authorization': token
                    }
                }).then((data=>{
                    return {
                        data:data.data.data
                    }
                })).catch(err=>{
                    throw {
                        message: err.message
                    }
                })
            } catch (error:any) {
                throw error
            }
        }
    },
    users: {
        list: async(page:number = 1, limit:number = 10, search:string = "", order:string = "desc")=>{
            try {
                const response = await axios.get(`${BASE_URL}/api-v1/user?page=${page}&search=`+search+"&order="+order, {
                    headers: {
                        'Authorization': getCookie('token')
                    }
                })
                return response.data.data
            } catch (error) {
                throw error
            }
        },
        getUserProfile: async(token:string)=>{
            try {
                const response = await axios.get(`${BASE_URL}/api-v1/user/profile`, {
                    headers: {
                        'Authorization': `${token}`
                    }
                })
                setCookie('session_user',JSON.stringify(response.data.data))
                return response.data.data
            } catch (error) {
                throw error
            }
        },
        addUser: async(payload:any)=>{
            try {
                payload.status = 'user'
                return axios.post(`${BASE_URL}/api-v1/user/add`, payload, {
                    headers: {
                        'Authorization': getCookie('token'),
                        'Content-Type': "multipart/form-data",
                    }
                }).then(data=>{
                    return data.data.data
                }).catch(err=>{
                    throw err
                })
            } catch (error) {
                throw error
            }
        },
        addUserDirect: async(payload:any)=>{
            try {
                payload.status = 'user'
                return axios.post(`${API_URL}/profile/photo`, payload, {
                    headers: {
                        'Authorization': getCookie('token'),
                        'Content-Type': "multipart/form-data",
                    }
                }).then(data=>{
                    return data.data.data
                }).catch(err=>{
                    throw err
                })
            } catch (error) {
                throw error
            }
        },
        getUserById: async(userId:string)=>{
            try {
                return axios.get(`${BASE_URL}/api-v1/user/`+userId, {
                    headers: {
                        'Authorization': `${getCookie('token')}`
                    }
                }).then(data=>{
                    return data.data.data
                }).catch(err=>{
                    throw err
                })
            } catch (error) {
                throw error
            }
        },
        editUserById: async(userId:string, payload:any)=>{
            try {
                payload.status = 'user'
                return axios.put(`${BASE_URL}/api-v1/user/${userId}`, payload, {
                    headers: {
                        'Authorization': `${getCookie('token')}`,
                        'Content-Type': "multipart/form-data"

                    }
                }).then(data=>{
                    return data.data.data
                }).catch(err=>{
                    throw err
                })
            } catch (error) {
                throw error
            }
        },
        deleteUserById: async(userId:string)=>{
            try {
                return axios.delete(`${BASE_URL}/api-v1/user/${userId}`,{
                    headers: {
                        'Authorization': getCookie('token')
                    }
                })
            } catch (error) {
                throw error
            }
        }
    },
    statistics: {
        dashboard: async()=>{
            try {
                const res = await axios.get(BASE_URL+'/api/v1/statistics/dashboard')
                return res.data.data
            } catch (error) {
                throw error
            }
        },
        session_history: async(duration:string = 'month')=>{
            try {
                const res = await axios.get(BASE_URL+'/api-v1/statistics/session-history?duration='+duration, {
                    headers: {
                        'Authorization': getCookie('token')
                    }
                })
                return res.data.data
            } catch (error) {
                throw error
            }
        },
        score_point: async(duration:string = 'month', page:number = 1, limit:number = 4)=>{
            try {
                const res = await axios.get(BASE_URL+'/api-v1/statistics/score-point?duration='+duration+'&limit='+limit+'&page='+page, {
                    headers: {
                        'Authorization': getCookie('token')
                    }
                })
                return res.data.data
            } catch (error) {
                throw error
            }
        },
        simulation_duration: async(duration:string = 'month')=>{
            try {
                const res = await axios.get(BASE_URL+'/api-v1/statistics/simulation_duration?duration='+duration, {
                    headers: {
                        'Authorization': getCookie('token')
                    }
                })
                return res.data.data
            } catch (error) {
                throw error
            }
        },
        scene_statistic: async(duration:string = 'month')=>{
            try {
                const res = await axios.get(BASE_URL+'/api-v1/statistics/scene?duration='+duration, {
                    headers: {
                        'Authorization': getCookie('token')
                    }
                })
                return res.data.data
            } catch (error) {
                throw error
            }
        },
        user_active: async(duration:string = 'month')=>{
            try {
                const res = await axios.get(BASE_URL+'/api-v1/statistics/user_active?duration='+duration, {
                    headers: {
                        'Authorization': getCookie('token')
                    }
                })
                return res.data.data
            } catch (error) {
                throw error
            }
        },
        leaderboard: async(duration:string = 'month')=>{
            try {
                const res = await axios.get(BASE_URL+'/api-v1/statistics/leaderboard?duration='+duration, {
                    headers: {
                        'Authorization': getCookie('token')
                    }
                })
                return res.data.data
            } catch (error) {
                throw error
            }
        },
    },
    fileManager: {
        list: async(page:number, limit:number, search:string, category:string = 'all', userId:string = "")=>{
            try {
                const response = await axios.get(`${BASE_URL}/api-v1/file?page=${page}&limit=${limit}&search=${search}&category=`+category+"&userId="+userId, {
                    headers: {
                        'Authorization': getCookie('token')
                    }
                })
                return response.data.data
            } catch (error) {
                throw error
            }
        },
        upload: async(payload:any)=>{
            try {
                await axios.post(`${BASE_URL}/api-v1/file/upload`, payload, {
                    headers: {
                        'Content-Type':'multipart/form-data',
                        'Authorization':getCookie('token'),
                    }}
                ).then(data=>{
                    return data
                }).catch((err)=>{
                    throw err
                })
            } catch (error) {
                throw error
            }
        },
        edit: async(payload:any, fileId:string = "")=>{
            try {
                axios.post(`${BASE_URL}/api-v1/file/edit/`+fileId, payload, {
                    headers: {
                        'Content-Type':'multipart/form-data',
                        'Authorization':getCookie('token'),
                    }}
                ).then(data=>{
                    return data
                }).catch((err)=>{
                    throw err
                })
            } catch (error) {
                throw error
            }
        },
        createFolder: async(name:string)=>{
            try {
                const response = await axios.post(`${BASE_URL}/api-v1/file/new_folder`, {
                    name: name
                }, {
                    headers: {
                        'Authorization': getCookie('token')
                    }
                })
                return response.data.data
            } catch (error) {
                throw error
            }
        },
        move: async(folder_id:string, file_id:Array<string>)=>{
            try {
                const response = await axios.post(`${BASE_URL}/api-v1/file/move`, {
                    folder_id: folder_id,
                    file_id: file_id
                }, {
                    headers: {
                        'Authorization': getCookie('token')
                    }
                })
                return response.data.data
            } catch (error) {
                throw error
            }
        },
    },
    session: {
        list: async(page:number, search:string, order:string = "asc")=>{
            try {
                const response = await axios.get(`${BASE_URL}/api-v1/session?page=${page}&search=`+search+"&order="+order, {
                    headers: {
                        'Authorization': getCookie('token')
                    }
                })
                return response.data.data
            } catch (error) {
                throw error
            }
        },
        detail: async(id:string)=>{
            try {
                const response = await axios.get(`${BASE_URL}/api-v1/session/${id}`, {
                    headers: {
                        'Authorization': getCookie('token')
                    }
                })
                return response.data.data
            } catch (error) {
                throw error
            }
        }
    },
    profile: {
        getProfile: async()=>{
            try {
                return axios.get(`${BASE_URL}/api-v1/profile`, {
                    headers: {
                        'Authorization': getCookie('token')
                    }
                }).then(data=>{
                    return data.data.data
                }).catch(err=>{
                    throw err
                })
            } catch (error) {
                throw error
            }
        },
        editProfile: async(payload:any)=>{
            try {
                return axios.post(`${BASE_URL}/api-v1/profile/edit`, payload, {
                    headers: {
                        'Authorization': getCookie('token')
                    }
                }).then(data=>{
                    return data.data.data
                }).catch(err=>{
                    throw err
                })
            } catch (error) {
                throw error
            }
        },
        updatePhoto: async(payload:any)=>{
            try {
                return axios.put(`${BASE_URL}/api-v1/profile/photo`, payload, {
                    headers: {
                        'Authorization': getCookie('token'),
                        'Content-Type': "multipart/form-data",
                    }
                }).then(data=>{
                    return data.data
                }).catch(err=>{
                    throw err
                })
            } catch (error) {
                throw error
            }
        },
        updatePhotoDirect: async(payload:any)=>{
            try {
                return axios.put(`${API_URL}/profile/photo`, payload, {
                    headers: {
                        'Authorization': 'Bearer '+getCookie('token'),
                        'Content-Type': "multipart/form-data",
                    }
                }).then(data=>{
                    return data.data
                }).catch(err=>{
                    throw err
                })
            } catch (error) {
                throw error
            }
        },
    }
}


export default apiService