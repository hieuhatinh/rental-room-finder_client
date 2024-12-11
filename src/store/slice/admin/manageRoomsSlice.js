import { createSlice } from '@reduxjs/toolkit'

import {
    fetchAcceptRequest,
    fetchGetDetailUnacceptRoom,
    fetchGetUnacceptRooms,
    fetchRejectRequest,
} from '../../actions/admin/manageRoomsAction'

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: null,
    unacceptedRooms: [],
    detailUnacceptRooms: null,
    infoAcceptRoom: null,
}

export const manageRoomsSlice = createSlice({
    name: 'adminManageRooms',
    initialState,
    reducers: {
        reState: (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.infoAcceptRoom = null
            state.message = null
            state.detailUnacceptRooms = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetUnacceptRooms.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchGetUnacceptRooms.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
                state.unacceptedRooms = action.payload.result
            })
            .addCase(fetchGetUnacceptRooms.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })

        builder
            .addCase(fetchGetDetailUnacceptRoom.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchGetDetailUnacceptRoom.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
                state.detailUnacceptRooms = action.payload.result
            })
            .addCase(fetchGetDetailUnacceptRoom.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })

        builder
            .addCase(fetchAcceptRequest.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchAcceptRequest.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
                state.infoAcceptRoom = action.payload.result
            })
            .addCase(fetchAcceptRequest.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })

        builder
            .addCase(fetchRejectRequest.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchRejectRequest.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
                state.infoAcceptRoom = action.payload.result
            })
            .addCase(fetchRejectRequest.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reState } = manageRoomsSlice.actions

export default manageRoomsSlice.reducer
