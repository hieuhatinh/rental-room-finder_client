import { createSlice } from '@reduxjs/toolkit'

import {
    fetchDeleteRoom,
    fetchGetAllRoomsOfLandlord,
    fetchGetDetailRoomByLandlord,
    fetchLandlordAddRoom,
} from '../../actions/landlord/manageRoomsAction'

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: null,
    idNewRoom: null,
    rooms: [],
    roomInfo: null,
    isDeleteRoom: false,
}

export const manageRoomsSlice = createSlice({
    name: 'landlordManageRooms',
    initialState,
    reducers: {
        reStateMessage: (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = null
            state.isDeleteRoom = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLandlordAddRoom.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchLandlordAddRoom.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
                state.idNewRoom = action.payload.idNewRoom
            })
            .addCase(fetchLandlordAddRoom.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.message
            })

        builder
            .addCase(fetchGetAllRoomsOfLandlord.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchGetAllRoomsOfLandlord.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
                state.rooms = action.payload.rooms
            })
            .addCase(fetchGetAllRoomsOfLandlord.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.message
            })

        builder
            .addCase(fetchGetDetailRoomByLandlord.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(
                fetchGetDetailRoomByLandlord.fulfilled,
                (state, action) => {
                    state.isLoading = false
                    state.isError = false
                    state.isSuccess = true
                    state.message = action.payload.message
                    state.roomInfo = action.payload.roomInfo
                },
            )
            .addCase(fetchGetDetailRoomByLandlord.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.message
            })

        builder
            .addCase(fetchDeleteRoom.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchDeleteRoom.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
                state.rooms = action.payload.rooms
                state.isDeleteRoom = true
            })
            .addCase(fetchDeleteRoom.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.message
            })
    },
})

export const { reStateMessage } = manageRoomsSlice.actions

export default manageRoomsSlice.reducer
