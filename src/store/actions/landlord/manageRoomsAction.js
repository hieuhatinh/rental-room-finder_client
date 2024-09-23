import { createAsyncThunk } from '@reduxjs/toolkit'

import {
    apiDeleteRoom,
    apiGetAllRoomsOfLandlord,
    apiGetDetailRoomByLandlord,
    apiLandlordAddRoom,
} from '../../../api/landlord/manageRoomsApi'
import { uploadFilesApi } from '../../../api/fileApi'

const fetchLandlordAddRoom = createAsyncThunk(
    'landlordManageRooms/fetchLandlordAddRoom',
    async ({ ...values }, { rejectWithValue }) => {
        try {
            const images = await uploadFilesApi(values.images)
            const result = await apiLandlordAddRoom({ ...values, images })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchGetAllRoomsOfLandlord = createAsyncThunk(
    'landlordManageRooms/fetchAllRoomsOfLandlord',
    async ({ limit, page }, { rejectWithValue }) => {
        try {
            const result = await apiGetAllRoomsOfLandlord({ limit, page })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchGetDetailRoomByLandlord = createAsyncThunk(
    'landlordManageRooms/fetchGetDetailRoomByLandlord',
    async ({ id_room }, { rejectWithValue }) => {
        try {
            const result = await apiGetDetailRoomByLandlord({ id_room })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchDeleteRoom = createAsyncThunk(
    'landlordManageRooms/fetchDeleteRoom',
    async ({ id_room, page, limit }, { rejectWithValue }) => {
        try {
            const result = await apiDeleteRoom({ id_room })

            const newRooms = await apiGetAllRoomsOfLandlord({ limit, page })

            return { ...result, ...newRooms }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

export {
    fetchLandlordAddRoom,
    fetchGetAllRoomsOfLandlord,
    fetchGetDetailRoomByLandlord,
    fetchDeleteRoom,
}
