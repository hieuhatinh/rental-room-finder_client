import axios from 'axios'
import axiosClient from './axiosClient'

const authApiLoginWithUsername = async ({ username, password }) => {
    try {
        const userInfo = await axiosClient.post('/auth/login/tenant', {
            username,
            password,
        })

        return userInfo.data
    } catch (error) {
        throw new Error(error.response?.data.message || error)
    }
}

const authApiRegisterWithUsername = async ({ username, password }) => {
    try {
        const newUser = await axiosClient.post('/auth/register/tenant', {
            username,
            password,
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
        let url = null
        if (avatar) {
            const url_upload = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`
            const formData = new FormData()
            formData.append('file', avatar)
            formData.append('upload_preset', 'profile-avatar')

            const response = await axios.post(url_upload, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            url = response.data.url
        }

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
