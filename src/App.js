import { Routes, Route } from 'react-router-dom'
import './App.css'

import {
    adminRoutes,
    authRoutes,
    landlordRoutes,
    sharedPrivateRoutes,
    tenantPublicRoutes,
} from './routes'
import AccessDenied from './pages/Warning/AccessDenied'
import ProtectAuthRoute from './pages/Protected/ProtectAuthRoute'
import LoginRequired from './pages/Warning/LoginRequired'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth } from './store/selector/authSelector'
import SocketProvider from './services/SocketProvider'
import { useEffect } from 'react'
import { getTokenFromCookies } from './utils/store/token'
import { getInfo } from './store/slice/authSlice'

function App() {
    const authState = useSelector(selectAuth)
    const dispatch = useDispatch()
    const token = getTokenFromCookies()

    useEffect(() => {
        if (token) {
            dispatch(getInfo())
        }
    }, [token, dispatch])

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
                            !!token && authState?.userInfo?.role === 'landlord'

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

                    {/* Route landlord + tenant */}
                    {sharedPrivateRoutes.map((item) => {
                        const Page = item.component
                        const isAuthorized =
                            !!token &&
                            (authState?.userInfo?.role === 'tenant' ||
                                authState?.userInfo?.role === 'landlord')

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
                            !!token && authState?.userInfo?.role === 'admin'

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
