import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiAddNewLandlord,
    apiDeleteLandlord,
    apiGetInfoLandlord,
    apiGetLandlords,
    apiUpdateInfoLandlord,
} from '../../../api/admin/manageLandlords'

const fetchAddNewLandlord = createAsyncThunk(
    'adminManageLandlords/fetchAddNewLandlord',
    async (
        {
            username,
            password,
            full_name,
            gender,
            profile_img,
            birth_date,
            phone_number,
        },
        { rejectWithValue },
    ) => {
        try {
            const newLandlord = await apiAddNewLandlord({
                username,
                password,
                full_name,
                gender,
                profile_img,
                birth_date,
                phone_number,
            })

            return newLandlord
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchGetLandlords = createAsyncThunk(
    'adminManageLandlords/fetchGetLandlords',
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const newLandlord = await apiGetLandlords({
                page,
                limit,
            })

            return newLandlord
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchGetInfoLandlord = createAsyncThunk(
    'adminManageLandlords/fetchGetInfoLandlord',
    async ({ idLandlord }, { rejectWithValue }) => {
        try {
            const newLandlord = await apiGetInfoLandlord({ idLandlord })

            return newLandlord
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchUpdateInfoLandlord = createAsyncThunk(
    'adminManageLandlords/fetchUpdateInfoLandlord',
    async (
        { idLandlord, full_name, address_name, phone_number, birth_date },
        { rejectWithValue },
    ) => {
        try {
            const newLandlord = await apiUpdateInfoLandlord({
                idLandlord,
                full_name,
                address_name,
                phone_number,
                birth_date,
            })

            return newLandlord
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchDeleteLandlord = createAsyncThunk(
    'adminManageLandlords/fetchDeleteLandlord',
    async ({ idLandlord }, { rejectWithValue }) => {
        try {
            const result = await apiDeleteLandlord({
                idLandlord,
            })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

export {
    fetchAddNewLandlord,
    fetchGetLandlords,
    fetchGetInfoLandlord,
    fetchUpdateInfoLandlord,
    fetchDeleteLandlord,
}
