import { createAsyncThunk } from '@reduxjs/toolkit'

import { deleteFileApi, uploadFilesApi } from '../../api/fileApi'

const fetchUploadFile = createAsyncThunk(
    'file/fetchUploadFile',
    async ({ files }, { rejectWithValue }) => {
        try {
            let response = await uploadFilesApi(files)

            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

const fetchDeleteFile = createAsyncThunk(
    'file/fetchDeleteFile',
    async ({ public_id }, { rejectWithValue }) => {
        try {
            let response = await deleteFileApi(public_id)

            return { response, public_id }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

export { fetchUploadFile, fetchDeleteFile }
