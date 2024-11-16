import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    authApiLoginSuccessGoogle,
    authApiLoginSuccess,
    authApiLoginWithUsername,
    authApiLogout,
    authApiRegisterWithUsername,
    authApiUpdateInfomation,
} from '../../api/authApi'
import {
    removeTokenFromCookies,
    saveTokenToCookies,
} from '../../utils/store/token'
import {
    removeUserInfoFromLocalStorage,
    saveUserInfoToLocalStorage,
} from '../../utils/store/localStorage'

const fetchLoginSuccessWithGoogle = createAsyncThunk(
    'auth/fetchLoginSuccessWithGoogle',
    async (_, { rejectWithValue }) => {
        try {
            const result = await authApiLoginSuccessGoogle()

            saveTokenToCookies(result.token)

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchLoginWithUsername = createAsyncThunk(
    'auth/fetchLoginWithUsername',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            let result = await authApiLoginWithUsername({ username, password })
            saveTokenToCookies(result.token)

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchRegisterWithUsername = createAsyncThunk(
    'auth/fetchRegisterWithUsername',
    async ({ username, password, gender, full_name }, { rejectWithValue }) => {
        try {
            let result = await authApiRegisterWithUsername({
                username,
                password,
                gender,
                full_name,
            })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchLoginSuccess = createAsyncThunk(
    'auth/fetchLoginSuccess',
    async (_, { rejectWithValue }) => {
        try {
            const userInfo = await authApiLoginSuccess()

            const saveInfoUser = {
                id_user: userInfo.user.id_user,
                full_name: userInfo.user.full_name,
                role: userInfo.user.role,
                avatar: userInfo.user.avatar,
                username: userInfo.user.username,
                email: userInfo.user.email,
                gender: userInfo.user.gender,
            }
            saveUserInfoToLocalStorage(saveInfoUser)

            return {
                user: saveInfoUser,
                message: userInfo.message,
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchLogout = createAsyncThunk(
    'auth/fetchLogout',
    async (_, { rejectWithValue }) => {
        try {
            let result = await authApiLogout()
            removeTokenFromCookies()
            removeUserInfoFromLocalStorage()

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchUpdateInfomation = createAsyncThunk(
    'auth/updateInformation',
    async (values, { rejectWithValue }) => {
        try {
            let result = await authApiUpdateInfomation(values)

            const newInfoUser = {
                id_user: result.newInfoUser.id_user,
                full_name: result.newInfoUser.full_name,
                role: result.newInfoUser.role,
                avatar: result.newInfoUser.avatar,
                username: result.newInfoUser.username,
                email: result.newInfoUser.email,
            }

            await saveUserInfoToLocalStorage(newInfoUser)

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

export {
    fetchLoginSuccessWithGoogle,
    fetchLoginWithUsername,
    fetchRegisterWithUsername,
    fetchLoginSuccess,
    fetchLogout,
    fetchUpdateInfomation,
}
