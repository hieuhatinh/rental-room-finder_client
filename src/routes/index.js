import DetailRoom from '../pages/Tenant/DetailRoom'
import HomeTenant from '../pages/Tenant/HomeTenant'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import SearchResult from '../pages/Tenant/SearchResult'
import HomeLandlord from '../pages/Landlord/HomeLanlord'
import { paths } from '../utils/pathsRoutes'
import RoomManagement from '../pages/Landlord/RoomManagement'

const authRoutes = [
    {
        component: Login,
        path: paths.login,
    },
    {
        component: Register,
        path: paths.register,
    },
]

const tenantRoutes = [
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
]

const adminRoutes = [{}]

export { tenantRoutes, landlordRoutes, adminRoutes, authRoutes }
