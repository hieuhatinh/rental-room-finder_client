import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: null,
    amentities: [],
    roomPrice: null,
    waterPrice: null,
    electricityPrice: null,
}

export const filterSearchSlice = createSlice({
    name: 'filterSearch',
    initialState,
    reducers: {
        setSelectedAmentities: (state, action) => {
            state.amentities = action.payload
        },
        setElectricityPrice: (state, action) => {
            state.electricityPrice = action.payload
        },
        setWaterPrice: (state, action) => {
            state.waterPrice = action.payload
        },
        setRoomPrice: (state, action) => {
            state.roomPrice = action.payload
        },
        setFilterPrameter: (state, action) => {
            state.amentities = action.payload.amentities
            state.waterPrice = action.payload.waterPrice
            state.electricityPrice = action.payload.electricityPrice
            state.roomPrice = action.payload.roomPrice
        },
    },
    extraReducers: (builder) => {},
})

export const {
    setElectricityPrice,
    setRoomPrice,
    setSelectedAmentities,
    setWaterPrice,
    setFilterPrameter,
} = filterSearchSlice.actions

export default filterSearchSlice.reducer
