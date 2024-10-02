import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slice/authSlice'
import chatbotReducer from './slice/chatbotSlice'
import fileReducer from './slice/fileSlice'
import mapsReducer from './slice/mapsSlice'
import manageLandlordsReducer from './slice/admin/manageLandlordsSlice'
import landlordManageRoomsReducer from './slice/landlord/manageRoomsSlice'
import amentitiesReducer from './slice/amentitiesSlice'
import adminManageRoomsReducer from './slice/admin/manageRoomsSlice'
import roomsTenantReducer from './slice/tenant/roomsSlice'
import filterSearchReducer from './slice/tenant/filterSearchSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        file: fileReducer,
        maps: mapsReducer,
        amentities: amentitiesReducer,
        landlordManageRooms: landlordManageRoomsReducer,
        adminManageLandlords: manageLandlordsReducer,
        adminManageRooms: adminManageRoomsReducer,
        roomsTenant: roomsTenantReducer,
        filterSearch: filterSearchReducer,
        chatbot: chatbotReducer,
    },
})
