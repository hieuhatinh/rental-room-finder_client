import { createSlice } from '@reduxjs/toolkit'

import { fetchGetAmentities } from '../actions/amentitiesAction'

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
                state.amentities = action.payload.amentities.map((item) => ({
                    value: item.id_amentity,
                    label: item.amentity_name,
                }))
            })
            .addCase(fetchGetAmentities.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload.message
            })
    },
})

export const {} = amentitiesSlice.actions

export default amentitiesSlice.reducer
