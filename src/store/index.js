import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slice/authSlice'
import fileReducer from './slice/fileSlice'
import mapsReducer from './slice/mapsSlice'
import manageLandlordsReducer from './slice/admin/manageLandlords'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        file: fileReducer,
        maps: mapsReducer,
        adminManageLandlords: manageLandlordsReducer,
    },
})
