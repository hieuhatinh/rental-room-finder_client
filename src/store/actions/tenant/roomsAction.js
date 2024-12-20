import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetDetailRoom,
    apiGetSomeRooms,
    apiSearchRooms,
} from '../../../api/tenant/roomsApi'

const fetchGetSomeRooms = createAsyncThunk(
    'roomsTenant/fetchGetSomeRooms',
    async (_, { rejectWithValue }) => {
        try {
            const result = await apiGetSomeRooms()

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchSearchRooms = createAsyncThunk(
    'roomsTenant/fetchSearchRooms',
    async (
        {
            display_name,
            lat,
            lon,
            page,
            limit,
            radius,
            amentities,
            roomPrice,
            waterPrice,
            electricityPrice,
            capacity,
        },
        { rejectWithValue },
    ) => {
        try {
            const result = await apiSearchRooms({
                display_name,
                lat,
                lon,
                page,
                limit,
                radius,
                amentities,
                roomPrice,
                waterPrice,
                electricityPrice,
                capacity,
            })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchGetDetailRoom = createAsyncThunk(
    'roomsTenant/fetchGetDetailRoom',
    async ({ id_room }, { rejectWithValue }) => {
        try {
            const result = await apiGetDetailRoom({
                id_room,
            })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

export { fetchGetSomeRooms, fetchSearchRooms, fetchGetDetailRoom }
