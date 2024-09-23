import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetAmentities } from '../../api/amentitiesApi'

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

export { fetchGetAmentities }
