import { Outlet, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getUserInfoFromLocalStorage } from '../../utils/store/localStorage'
import { getTokenFromCookies } from '../../utils/store/token'
import roles from '../../utils/roles'
import { paths } from '../../utils/pathsRoutes'
import {
    adminRoutes,
    landlordRoutes,
    sharedPrivateRoutes,
    tenantPrivateRoute,
} from '../../routes'
import { selectAuth } from '../../store/selector/authSelector'
import LoginRequired from '../Warning/LoginRequired'
import AccessDenied from '../Warning/AccessDenied'

const RoleBasedRedirect = () => {
    const authState = useSelector(selectAuth)
    const userInfo = getUserInfoFromLocalStorage()
    const navigate = useNavigate()
    const token = getTokenFromCookies()

    // useEffect(() => {
    if (token && userInfo?.role) {
        switch (userInfo?.role) {
            case roles.tenant:
                // navigate(paths.tenant.homeTenant)
                // break
                return tenantPrivateRoute.map((item) => {
                    const Page = item.component
                    const isAuthorized =
                        !!token && authState?.userInfo?.role === roles.tenant

                    return (
                        <Route
                            key={item.path}
                            path={item.path}
                            element={
                                isAuthorized ? <Page /> : <LoginRequired />
                            }
                        />
                    )
                })
            case roles.landlord:
                return landlordRoutes.map((item) => {
                    const Page = item.component
                    const isAuthorized =
                        !!token && authState?.userInfo?.role === roles.landlord

                    return (
                        <Route
                            key={item.path}
                            path={item.path}
                            element={isAuthorized ? <Page /> : <AccessDenied />}
                        />
                    )
                })
            case roles.admin:
                // navigate(paths.admin.homeAdmin)
                // break
                return adminRoutes.map((item) => {
                    const Page = item.component
                    const isAuthorized =
                        !!token && authState?.userInfo?.role === roles.admin

                    return (
                        <Route
                            key={item.path}
                            path={item.path}
                            element={isAuthorized ? <Page /> : <AccessDenied />}
                        />
                    )
                })
            case roles.landlord || roles.tenant:
                return sharedPrivateRoutes.map((item) => {
                    const Page = item.component
                    const isAuthorized =
                        !!token &&
                        (authState?.userInfo?.role === roles.tenant ||
                            authState?.userInfo?.role === roles.landlord)

                    return (
                        <Route
                            key={item.path}
                            path={item.path}
                            element={
                                isAuthorized ? <Page /> : <LoginRequired />
                            }
                        >
                            {item.elements.map((itemElement) => {
                                const PageElement = itemElement.component
                                return (
                                    <Route
                                        key={itemElement.path}
                                        path={itemElement.path} // Thêm path cho Route con
                                        element={<PageElement />}
                                    />
                                )
                            })}
                        </Route>
                    )
                })
            default:
                navigate(paths.tenant.homeTenant) // Fallback to default home if role is unknown
        }
    } else {
        // If no token or role, stay on the default home page
        // navigate(paths.tenant.homeTenant)
        return <Outlet />
    }
    // }, [navigate, token, userInfo])
}

export default RoleBasedRedirect
