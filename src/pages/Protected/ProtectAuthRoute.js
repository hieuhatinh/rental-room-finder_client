import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { paths } from '../../utils/pathsRoutes'
import { getTokenFromCookies } from '../../utils/store/token'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLoginSuccess } from '../../store/actions/authAction'
import { getUserInfoFromLocalStorage } from '../../utils/store/localStorage'
import { selectAuth } from '../../store/selector/authSelector'
import LoadingPage from '../Loading'
import roles from '../../utils/roles'

const ProtectAuthRoute = () => {
    const userInfo = getUserInfoFromLocalStorage()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = getTokenFromCookies()
    const authState = useSelector(selectAuth)

    useEffect(() => {
        if (token) {
            dispatch(fetchLoginSuccess())
        }
    }, [token, dispatch, navigate])

    useEffect(() => {
        if (token) {
            switch (userInfo?.role) {
                case roles.tenant:
                    navigate(paths.tenant.homeTenant)
                    break
                case roles.admin:
                    navigate(paths.admin.homeAdmin)
                    break
                case roles.landlord:
                    navigate(paths.landlord.homeLandlord)
                    break
                default:
                    navigate(paths.login)
                    break
            }
        }
    }, [userInfo?.role, navigate, token])

    if (authState.isLoading) {
        return <LoadingPage />
    }

    return <Outlet />
}

export default ProtectAuthRoute
