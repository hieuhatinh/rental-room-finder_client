import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import { selectAuth } from '../../store/selector/authSelector'
import { paths } from '../../utils/pathsRoutes'

const ProtectAuthRoute = () => {
    const authState = useSelector(selectAuth)

    if (!!authState.token && !!authState.userInfo) {
        return <Navigate to={paths.tenant.homeTenant} replace />
    }

    return <Outlet />
}

export default ProtectAuthRoute
