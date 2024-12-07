import { createSlice } from '@reduxjs/toolkit'

import {
    fetchCreateRoommateRequest,
    fetchDeletePost,
    fetchGetAllRequest,
    fetchGetMyPostsRequest,
    fetchSearchRoommate,
} from '../../actions/tenant/roommateRequestAction'

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: null,
    requests: [],
    myPosts: [],
}

export const roommateRequestSlice = createSlice({
    name: 'roommateRequest',
    initialState,
    reducers: {
        resetState: (state, action) => {
            state.isSuccess = false
            state.isError = false
            state.isLoading = false
            state.message = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetAllRequest.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchGetAllRequest.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
                state.requests = action.payload.requests
            })
            .addCase(fetchGetAllRequest.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.message
            })

        builder
            .addCase(fetchGetMyPostsRequest.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchGetMyPostsRequest.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
                state.myPosts = action.payload.requests
            })
            .addCase(fetchGetMyPostsRequest.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.message
            })

        builder
            .addCase(fetchCreateRoommateRequest.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchCreateRoommateRequest.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(fetchCreateRoommateRequest.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.message
            })

        builder
            .addCase(fetchSearchRoommate.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchSearchRoommate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
                state.requests = action.payload.requests
            })
            .addCase(fetchSearchRoommate.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.message
            })

        builder
            .addCase(fetchDeletePost.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchDeletePost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
                state.requests = action.payload.requests
                state.typeAction = 'fetchDeletePost'
            })
            .addCase(fetchDeletePost.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.message
            })
    },
})

export const { resetState } = roommateRequestSlice.actions

export default roommateRequestSlice.reducer
