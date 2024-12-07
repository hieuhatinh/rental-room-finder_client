import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: null,
    isChatbotOpen: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toggleChatbot: (state, action) => {
            state.isChatbotOpen = !state.isChatbotOpen
        },
    },
    extraReducers: (builder) => {},
})

export const { toggleChatbot } = authSlice.actions

export default authSlice.reducer
