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

const authApiUpdateInfomation = async (values) => {
    try {
        let newUser
        if (!!values.avatar || !!values.full_name) {
            const url = await apiUploadSingleFile(values.avatar)

            newUser = await axiosClient.put('/auth/update-info', {
                avatar: url,
                full_name: values.full_name,
            })
        } else if (!!values.gender) {
            newUser = await axiosClient.put('/auth/update-info', {
                gender: values.gender,
            })
        }

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
