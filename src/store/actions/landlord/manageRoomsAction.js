import { createAsyncThunk } from '@reduxjs/toolkit'

import { apiLandlordAddRoom } from '../../../api/landlord/manageRoomsApi'
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

export { fetchLandlordAddRoom }
