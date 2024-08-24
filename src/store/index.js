import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slice/authSlice'
import chatbotReducer from './slice/chatbotSlice'

export const store = configureStore({
    reducer: { auth: authReducer, chatbot: chatbotReducer },
})
