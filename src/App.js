import { Routes, Route } from 'react-router-dom'
import './App.css'

import {
    adminRoutes,
    authRoutes,
    landlordRoutes,
    sharedPrivateRoutes,
    tenantPrivateRoute,
    tenantPublicRoutes,
} from './routes'
import AccessDenied from './pages/Warning/AccessDenied'
import ProtectAuthRoute from './pages/Protected/ProtectAuthRoute'
import LoginRequired from './pages/Warning/LoginRequired'
import { useSelector } from 'react-redux'
import { selectAuth } from './store/selector/authSelector'
import SocketProvider from './services/SocketProvider'
import { getTokenFromCookies } from './utils/store/token'
import roles from './utils/roles'

function App() {
    const authState = useSelector(selectAuth)
    const token = getTokenFromCookies()

    return (
        <SocketProvider>
            <div className='h-full'>
                <Routes>
                    {/* Route login + register */}
                    <Route element={<ProtectAuthRoute />}>
                        {authRoutes.map((item) => {
                            const Page = item.component
                            return (
                                <Route
                                    key={item.path}
                                    path={item.path}
                                    element={<Page />}
                                />
                            )
                        })}
                    </Route>

                    {/* Route landlord */}
                    {landlordRoutes.map((item) => {
                        const Page = item.component
                        const isAuthorized =
                            !!token &&
                            authState?.userInfo?.role === roles.landlord

                        return (
                            <Route
                                key={item.path}
                                path={item.path}
                                element={
                                    isAuthorized ? <Page /> : <AccessDenied />
                                }
                            />
                        )
                    })}

                    {/* Route tenant */}
                    {tenantPublicRoutes.map((item) => {
                        const Page = item.component
                        return (
                            <Route
                                key={item.path}
                                path={item.path}
                                element={<Page />}
                            />
                        )
                    })}

                    {tenantPrivateRoute.map((item) => {
                        const Page = item.component
                        const isAuthorized =
                            !!token &&
                            authState?.userInfo?.role === roles.tenant

                        return (
                            <Route
                                key={item.path}
                                path={item.path}
                                element={
                                    isAuthorized ? <Page /> : <LoginRequired />
                                }
                            />
                        )
                    })}

                    {/* Route landlord + tenant */}
                    {sharedPrivateRoutes.map((item) => {
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
                    })}

                    {adminRoutes.map((item) => {
                        const Page = item.component
                        const isAuthorized =
                            !!token && authState?.userInfo?.role === roles.admin

                        return (
                            <Route
                                key={item.path}
                                path={item.path}
                                element={
                                    isAuthorized ? <Page /> : <AccessDenied />
                                }
                            />
                        )
                    })}
                </Routes>
            </div>
        </SocketProvider>
    )
}

export default App
