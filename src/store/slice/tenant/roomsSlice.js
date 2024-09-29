import { createSlice } from '@reduxjs/toolkit'

import {
    fetchGetDetailRoom,
    fetchGetSomeRooms,
    fetchSearchRooms,
} from '../../actions/tenant/roomsAction'

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: null,
    someRooms: [],
    searchRoomsResult: [],
    roomDetail: null,
}

export const roomsTenantSlice = createSlice({
    name: 'roomsTenant',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetSomeRooms.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchGetSomeRooms.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
                state.someRooms = action.payload.rooms
            })
            .addCase(fetchGetSomeRooms.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.message
            })

        builder
            .addCase(fetchSearchRooms.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchSearchRooms.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
                state.searchRoomsResult = action.payload.rooms
            })
            .addCase(fetchSearchRooms.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.message
            })

        builder
            .addCase(fetchGetDetailRoom.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchGetDetailRoom.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
                state.roomDetail = action.payload.roomInfo
            })
            .addCase(fetchGetDetailRoom.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.message
            })
    },
})

export const {} = roomsTenantSlice.actions

export default roomsTenantSlice.reducer
