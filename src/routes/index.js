import DetailRoom from '../pages/Tenant/DetailRoom'
import HomeTenant from '../pages/Tenant/HomeTenant'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import SearchResult from '../pages/Tenant/SearchResult'

export const paths = {
    homeTenant: '/',
    searchResult: '/tenant/search-result',
    login: '/login',
    register: '/register',
    roomDetail: '/room-detail',
}

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
        path: paths.roomDetail,
    },
]

export { tenantRoutes, authRoutes }
