import DetailRoom from '../pages/Tenant/DetailRoom'
import HomeTenant from '../pages/Tenant/HomeTenant'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import SearchResult from '../pages/Tenant/SearchResult'
import HomeLandlord from '../pages/Landlord/HomeLanlord'
import { paths } from '../utils/pathsRoutes'

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
        path: paths.homeTenant,
    },
    {
        component: SearchResult,
        path: paths.searchResult,
    },
    {
        component: DetailRoom,
        path: '/room-detail',
    },
]

const landlordRoutes = [
    {
        component: HomeLandlord,
        path: paths.landlord.homeLandlord,
    },
]

const adminRoutes = [{}]

export { tenantRoutes, landlordRoutes, adminRoutes, authRoutes }
