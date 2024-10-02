import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetAmentities, apiGetAmentitiesId } from '../../api/amentitiesApi'

const fetchGetAmentities = createAsyncThunk(
    'amentities/fetchGetAmentities',
    async (_, { rejectWithValue }) => {
        try {
            const result = await apiGetAmentities()

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchGetAmentitiesId = createAsyncThunk(
    'amentities/fetGetAmentitiesId',
    async ({ names }, { rejectWithValue }) => {
        try {
            const result = await apiGetAmentitiesId({ names })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

export { fetchGetAmentities, fetchGetAmentitiesId }
