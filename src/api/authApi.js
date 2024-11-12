import axiosClient from './axiosClient'
import { apiUploadSingleFile } from './fileApi'

const authApiLoginWithUsername = async ({ username, password }) => {
    try {
        const userInfo = await axiosClient.post('/auth/login', {
            username,
            password,
        })

        return userInfo.data
    } catch (error) {
        throw new Error(error.response?.data.message || error)
    }
}

const authApiRegisterWithUsername = async ({
    username,
    password,
    gender,
    full_name,
}) => {
    try {
        const newUser = await axiosClient.post('/auth/register/tenant', {
            username,
            password,
            gender,
            full_name,
        })

        return newUser.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const authApiLoginSuccess = async () => {
    try {
        const newUser = await axiosClient.get('/auth/login/success', {
            withCredentials: true,
        })

        return newUser.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const authApiLoginSuccessGoogle = async () => {
    try {
        const userInfo = await axiosClient.get('/auth/login/google/success', {
            withCredentials: true,
        })

        return userInfo.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const authApiLogout = async () => {
    try {
        const newUser = await axiosClient.get('/auth/logout')

        return newUser.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const authApiUpdateInfomation = async ({ avatar, full_name }) => {
    try {
        const url = await apiUploadSingleFile(avatar)

        const newUser = await axiosClient.put('/auth/update-info', {
            avatar: url,
            full_name,
        })

        return newUser.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export {
    authApiLoginWithUsername,
    authApiRegisterWithUsername,
    authApiLoginSuccess,
    authApiLoginSuccessGoogle,
    authApiLogout,
    authApiUpdateInfomation,
}
