import { createSlice } from '@reduxjs/toolkit'

import {
    fetchAddNewLandlord,
    fetchDeleteLandlord,
    fetchGetInfoLandlord,
    fetchGetLandlords,
    fetchUpdateInfoLandlord,
} from '../../actions/admin/manageLandlordsAction'

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: null,
    landlordInfo: null,
    landlords: [],
}

export const manageLandlordsSlice = createSlice({
    name: 'adminManageLandlords',
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
            .addCase(fetchAddNewLandlord.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchAddNewLandlord.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(fetchAddNewLandlord.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })

        builder
            .addCase(fetchGetLandlords.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchGetLandlords.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
                state.landlords = action.payload.result
            })
            .addCase(fetchGetLandlords.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })

        builder
            .addCase(fetchGetInfoLandlord.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchGetInfoLandlord.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
                state.landlordInfo = action.payload.infoLandlord
            })
            .addCase(fetchGetInfoLandlord.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })

        builder
            .addCase(fetchUpdateInfoLandlord.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchUpdateInfoLandlord.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
                state.landlordInfo = action.payload.infoLandlord
            })
            .addCase(fetchUpdateInfoLandlord.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })

        builder
            .addCase(fetchDeleteLandlord.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchDeleteLandlord.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(fetchDeleteLandlord.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reStateMessage } = manageLandlordsSlice.actions

export default manageLandlordsSlice.reducer
