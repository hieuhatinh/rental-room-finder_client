import { createSlice } from '@reduxjs/toolkit'
import {
    fetchLoginSuccess,
    fetchLoginSuccessWithGoogle,
    fetchLoginWithUsername,
    fetchLogout,
    fetchRegisterWithUsername,
    fetchUpdateInfomation,
} from '../actions/authAction'
import { getUserInfoFromLocalStorage } from '../../utils/store/localStorage'
import { getTokenFromCookies } from '../../utils/store/token'

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: null,
    userInfo: getUserInfoFromLocalStorage() || null,
    token: getTokenFromCookies() || null,
    isOnline: false,
    onlineUsers: [],
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsOnline: (state, action) => {
            state.isOnline = action.payload?.isOnline
            state.onlineUsers = action.payload.onlineUsers
        },
        reStateError: (state, action) => {
            state.isError = false
            state.message = null
        },
        reStateSuccess: (state, action) => {
            state.isSuccess = false
            state.message = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLoginWithUsername.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchLoginWithUsername.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(fetchLoginWithUsername.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })

        builder
            .addCase(fetchRegisterWithUsername.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchRegisterWithUsername.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(fetchRegisterWithUsername.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })

        builder
            .addCase(fetchLoginSuccess.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchLoginSuccess.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
                state.userInfo = getUserInfoFromLocalStorage()
                state.token = getTokenFromCookies()
            })
            .addCase(fetchLoginSuccess.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })

        builder
            .addCase(fetchLoginSuccessWithGoogle.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchLoginSuccessWithGoogle.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(fetchLoginSuccessWithGoogle.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })

        builder
            .addCase(fetchLogout.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchLogout.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.userInfo = null
                state.token = null
                state.isOnline = false
                state.idUser = null
            })
            .addCase(fetchLogout.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
            })

        builder
            .addCase(fetchUpdateInfomation.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchUpdateInfomation.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
                state.userInfo = getUserInfoFromLocalStorage()
                state.token = getTokenFromCookies()
            })
            .addCase(fetchUpdateInfomation.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { setIsOnline, reStateError, reStateSuccess } = authSlice.actions

export default authSlice.reducer
