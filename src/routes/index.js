import DetailRoom from '../pages/Tenant/DetailRoom'
import HomeTenant from '../pages/Tenant/HomeTenant'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import SearchResult from '../pages/Tenant/SearchResult'
import HomeLandlord from '../pages/Landlord/HomeLanlord'
import { paths } from '../utils/pathsRoutes'
import RoomManagement from '../pages/Landlord/RoomManagement'
import AddNewRoom from '../pages/Landlord/AddNewRoom'
import GoogleSuccessLoading from '../pages/Loading/GoogleSuccessLoading'
import ChatApp from '../pages/Chat'
import MessagePage from '../pages/Chat/MessagePage'

const authRoutes = [
    {
        component: Login,
        path: paths.login,
    },
    {
        component: Register,
        path: paths.register,
    },
    {
        component: GoogleSuccessLoading,
        path: paths.googleSuccess,
    },
]

const tenantPublicRoutes = [
    {
        component: HomeTenant,
        path: paths.tenant.homeTenant,
    },
    {
        component: SearchResult,
        path: paths.tenant.searchResult,
    },
    {
        component: DetailRoom,
        path: paths.tenant.roomDetail,
    },
]

const landlordRoutes = [
    {
        component: HomeLandlord,
        path: paths.landlord.homeLandlord,
    },
    {
        component: RoomManagement,
        path: paths.landlord.roomManagement,
    },
    {
        component: AddNewRoom,
        path: paths.landlord.addRoom,
    },
]

const sharedPrivateRoutes = [
    {
        component: ChatApp,
        path: paths.shared.chatApp,
        elements: [
            {
                component: MessagePage,
                path: paths.shared.chatAppIdUser,
            },
        ],
    },
]

const adminRoutes = [{}]

export {
    tenantPublicRoutes,
    landlordRoutes,
    adminRoutes,
    authRoutes,
    sharedPrivateRoutes,
}
