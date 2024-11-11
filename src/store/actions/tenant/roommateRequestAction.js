import { createAsyncThunk } from '@reduxjs/toolkit'

import {
    apiCreateRoommateRequest,
    apiDeletePost,
    apiGetAllRequest,
    apiGetMyPostsRequest,
    apiSearchRoommate,
} from '../../../api/tenant/roommateRequestApi'
import { uploadFilesApi } from '../../../api/fileApi'

const fetchGetAllRequest = createAsyncThunk(
    'roommateRequest/fetchGetAllRequest',
    async (values, { rejectWithValue }) => {
        try {
            const result = await apiGetAllRequest(values)

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchGetMyPostsRequest = createAsyncThunk(
    'roommateRequest/fetchGetMyPostsRequest',
    async (values, { rejectWithValue }) => {
        try {
            const result = await apiGetMyPostsRequest(values)

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchCreateRoommateRequest = createAsyncThunk(
    'roommateRequest/fetchCreateRoommateRequest',
    async (values, { rejectWithValue }) => {
        try {
            let images
            if (values?.images) {
                images = await uploadFilesApi(values.images)
            }
            const result = await apiCreateRoommateRequest({ ...values, images })

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchSearchRoommate = createAsyncThunk(
    'roommateRequest/fetchSearchRoommate',
    async (values, { rejectWithValue }) => {
        try {
            const result = await apiSearchRoommate(values)

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchDeletePost = createAsyncThunk(
    'roommateRequest/fetchDeletePost',
    async (values, { rejectWithValue }) => {
        try {
            const result = await apiDeletePost(values)

            return result
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

export {
    fetchGetAllRequest,
    fetchGetMyPostsRequest,
    fetchCreateRoommateRequest,
    fetchSearchRoommate,
    fetchDeletePost,
}
