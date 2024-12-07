import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetAddressFromCoordinates,
    apiGetAddressFromSearchText,
} from '../../api/mapsApi'

const fetchGetAddressFromSearchText = createAsyncThunk(
    'maps/fetchGetAddressFromSearchText',
    async ({ searchText }, { rejectWithValue }) => {
        try {
            let response = await apiGetAddressFromSearchText({ searchText })

            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchGetAddressFromCoordinates = createAsyncThunk(
    'maps/fetchGetAddressFromCoordinates',
    async ({ lat, lng }, { rejectWithValue }) => {
        try {
            let response = await apiGetAddressFromCoordinates({ lat, lng })

            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

export { fetchGetAddressFromSearchText, fetchGetAddressFromCoordinates }
