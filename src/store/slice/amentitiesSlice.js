import { createSlice } from '@reduxjs/toolkit'

import {
    fetchAcceptAmentity,
    fetchAddAmentity,
    fetchAllAmentitiesByAdmin,
    fetchGetAmentities,
    fetchGetAmentitiesByLandlord,
    fetchRefuseAmentity,
} from '../actions/amentitiesAction'

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: null,
    amentities: [],
}

export const amentitiesSlice = createSlice({
    name: 'amentities',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetAmentities.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchGetAmentities.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
                state.amentities = action.payload.amentities
            })
            .addCase(fetchGetAmentities.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.message
            })

        // landlord
        builder
            .addCase(fetchGetAmentitiesByLandlord.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(
                fetchGetAmentitiesByLandlord.fulfilled,
                (state, action) => {
                    state.isLoading = false
                    state.isError = false
                    state.isSuccess = true
                    state.message = action.payload.message
                    state.amentities = action.payload.amentities
                },
            )
            .addCase(fetchGetAmentitiesByLandlord.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.message
            })

        builder
            .addCase(fetchAddAmentity.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchAddAmentity.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload.message
                // state.amentities = action.payload.amentities
            })
            .addCase(fetchAddAmentity.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.message
            })

        // admin
        builder
            .addCase(fetchAllAmentitiesByAdmin.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchAllAmentitiesByAdmin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload?.message
                state.amentities = action.payload.amentities
            })
            .addCase(fetchAllAmentitiesByAdmin.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload?.message
            })

        builder
            .addCase(fetchAcceptAmentity.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchAcceptAmentity.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload?.message
                state.amentities = action.payload.amentities
            })
            .addCase(fetchAcceptAmentity.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload?.message
            })

        builder
            .addCase(fetchRefuseAmentity.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchRefuseAmentity.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = action.payload?.message
                state.amentities = action.payload.amentities
            })
            .addCase(fetchRefuseAmentity.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload?.message
            })
    },
})

export const {} = amentitiesSlice.actions

export default amentitiesSlice.reducer
