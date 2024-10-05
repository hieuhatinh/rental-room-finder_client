import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiAcceptAmentity,
    apiAddAmentity,
    apiGetAllAmentitiesByAdmin,
    apiGetAmentities,
    apiGetAmentitiesByLandlord,
    apiGetAmentitiesId,
    apiRefuseAmentity,
} from '../../api/amentitiesApi'

const fetchGetAmentities = createAsyncThunk(
    'amentities/fetchGetAmentities',
    async (_, { rejectWithValue }) => {
        try {
            const result = await apiGetAmentities()

            return {
                ...result,
                amentities: result.amentities.map((item) => ({
                    value: item.id_amentity,
                    label: item.amentity_name,
                    status: item.status,
                })),
            }
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

// landlord, admin
const fetchGetAmentitiesByLandlord = createAsyncThunk(
    'amentities/fetchGetAmentitiesByLandlord',
    async (_, { rejectWithValue }) => {
        try {
            const result = await apiGetAmentitiesByLandlord()

            return {
                ...result,
                amentities: result.amentities.map((item) => ({
                    value: item.id_amentity,
                    label: item.amentity_name,
                    status: item.status,
                })),
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchAddAmentity = createAsyncThunk(
    'amentities/fetchAddAmentity',
    async ({ amentity }, { rejectWithValue }) => {
        try {
            const result = await apiAddAmentity({ amentity })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchAllAmentitiesByAdmin = createAsyncThunk(
    'amentities/fetchAllAmentitiesByAdmin',
    async (_, { rejectWithValue }) => {
        try {
            const result = await apiGetAllAmentitiesByAdmin()

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchAcceptAmentity = createAsyncThunk(
    'amentities/fetchAcceptAmentity',
    async ({ id_amentity }, { rejectWithValue }) => {
        try {
            const result = await apiAcceptAmentity({ id_amentity })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchRefuseAmentity = createAsyncThunk(
    'amentities/fetchRefuseAmentity',
    async ({ id_amentity }, { rejectWithValue }) => {
        try {
            const result = await apiRefuseAmentity({ id_amentity })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

export {
    fetchGetAmentities,
    fetchGetAmentitiesId,
    fetchGetAmentitiesByLandlord,
    fetchAddAmentity,
    fetchAllAmentitiesByAdmin,
    fetchAcceptAmentity,
    fetchRefuseAmentity,
}
