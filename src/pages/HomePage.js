import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { getUserInfoFromLocalStorage } from '../utils/store/localStorage'
import { getTokenFromCookies } from '../utils/store/token'
import roles from '../utils/roles'
import { paths } from '../utils/pathsRoutes'
import LoadingPage from './Loading'

const HomePage = () => {
    const userInfo = getUserInfoFromLocalStorage()
    const navigate = useNavigate()
    const token = getTokenFromCookies()

    useEffect(() => {
        if (token) {
            switch (userInfo?.role) {
                case roles.tenant:
                    navigate(paths.tenant.homeTenant)
                    break
                case roles.landlord:
                    navigate(paths.landlord.homeLandlord)
                    break
                case roles.admin:
                    navigate(paths.admin.homeAdmin)
                    break
                default:
                    navigate(paths.login)
                    break
            }
        }
    }, [userInfo?.role, navigate, token])

    return <LoadingPage />
}

export default HomePage
