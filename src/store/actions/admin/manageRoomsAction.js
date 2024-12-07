import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiAcceptRequest,
    apiGetDetailUnacceptRoom,
    apiGetUnacceptRooms,
} from '../../../api/admin/manageRoomsApi'

const fetchGetUnacceptRooms = createAsyncThunk(
    'adminManageRooms/fetchGetUnacceptRooms',
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const unacceptRooms = await apiGetUnacceptRooms({
                page,
                limit,
            })

            return unacceptRooms
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchGetDetailUnacceptRoom = createAsyncThunk(
    'adminManageRooms/fetchGetDetailUnacceptRoom',
    async ({ id_landlord, id_room }, { rejectWithValue }) => {
        try {
            const detailUnaccept = await apiGetDetailUnacceptRoom({
                id_landlord,
                id_room,
            })

            return detailUnaccept
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchAcceptRequest = createAsyncThunk(
    'adminManageRooms/fetchAcceptRequest',
    async ({ id_landlord, id_room }, { rejectWithValue }) => {
        try {
            const result = await apiAcceptRequest({
                id_landlord,
                id_room,
            })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

export { fetchGetUnacceptRooms, fetchGetDetailUnacceptRoom, fetchAcceptRequest }
