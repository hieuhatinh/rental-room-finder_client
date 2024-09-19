import { createSlice } from '@reduxjs/toolkit'

import { fetchLandlordAddRoom } from '../../actions/landlord/manageRoomsAction'

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: null,
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
            })
            .addCase(fetchLandlordAddRoom.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.message
            })
    },
})

export const { reStateMessage } = manageRoomsSlice.actions

export default manageRoomsSlice.reducer
