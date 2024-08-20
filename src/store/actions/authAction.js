import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    authApiLoginSuccessGoogle,
    authApiLoginSuccess,
    authApiLoginWithUsername,
    authApiLogout,
    authApiRegisterWithUsername,
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
    async ({ username, password }, { rejectWithValue }) => {
        try {
            let result = await authApiRegisterWithUsername({
                username,
                password,
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
            let userInfo = await authApiLoginSuccess()
            let saveInfoUser = {
                full_name: userInfo.user.full_name,
                role: userInfo.user.role,
                avatar: userInfo.user.avatar,
                username: userInfo.user.username,
            }
            saveUserInfoToLocalStorage(saveInfoUser)

            return userInfo
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

export {
    fetchLoginSuccessWithGoogle,
    fetchLoginWithUsername,
    fetchRegisterWithUsername,
    fetchLoginSuccess,
    fetchLogout,
}
