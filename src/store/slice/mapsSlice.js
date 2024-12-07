import { createSlice } from '@reduxjs/toolkit'

import {
    fetchGetAddressFromCoordinates,
    fetchGetAddressFromSearchText,
} from '../actions/mapsAction'

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: null,
    listAddress: [],
    selectionAddress: null,
}

export const mapsSlice = createSlice({
    name: 'maps',
    initialState,
    reducers: {
        selectPosition: (state, action) => {
            state.selectionAddress = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetAddressFromSearchText.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(
                fetchGetAddressFromSearchText.fulfilled,
                (state, action) => {
                    state.isLoading = false
                    state.isError = false
                    state.isSuccess = true
                    state.listAddress = action.payload
                },
            )
            .addCase(
                fetchGetAddressFromSearchText.rejected,
                (state, action) => {
                    state.isLoading = false
                    state.isSuccess = false
                    state.isError = true
                    state.message = action.payload.message
                },
            )

        builder
            .addCase(
                fetchGetAddressFromCoordinates.pending,
                (state, action) => {
                    state.isLoading = true
                    state.isError = false
                    state.isSuccess = false
                    state.message = null
                },
            )
            .addCase(
                fetchGetAddressFromCoordinates.fulfilled,
                (state, action) => {
                    state.isLoading = false
                    state.isError = false
                    state.isSuccess = true
                    state.selectionAddress = action.payload
                },
            )
            .addCase(
                fetchGetAddressFromCoordinates.rejected,
                (state, action) => {
                    state.isLoading = false
                    state.isSuccess = false
                    state.isError = true
                    state.message = action.payload.message
                },
            )
    },
})

export const { selectPosition } = mapsSlice.actions

export default mapsSlice.reducer
