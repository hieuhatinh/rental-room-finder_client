import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: null,
    amentities: null,
    roomPrice: null,
    waterPrice: null,
    electricityPrice: null,
    capacity: null,
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
        setCapacity: (state, action) => {
            state.capacity = action.payload
        },
    },
    extraReducers: (builder) => {},
})

export const {
    setElectricityPrice,
    setRoomPrice,
    setSelectedAmentities,
    setWaterPrice,
    setCapacity,
} = filterSearchSlice.actions

export default filterSearchSlice.reducer
