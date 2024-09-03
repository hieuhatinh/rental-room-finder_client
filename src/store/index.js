import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slice/authSlice'
import fileReducer from './slice/fileSlice'

export const store = configureStore({
    reducer: { auth: authReducer, file: fileReducer },
})
