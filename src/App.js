import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import { authRoutes, landlordRoutes, tenantPublicRoutes } from './routes'
import AccessDeniedpage from './pages/AccessDeniedPage'
import { selectAuth } from './store/selector/authSelector'
import ProtectAuthRoute from './pages/Protected/ProtectAuthRoute'

function App() {
    const authState = useSelector(selectAuth)

    return (
        <div className='h-full'>
            <Routes>
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

                {landlordRoutes.map((item) => {
                    const Page = item.component
                    return (
                        <Route
                            key={item.path}
                            path={item.path}
                            element={
                                authState.userInfo?.role === 'landlord' ? (
                                    <Page />
                                ) : (
                                    <AccessDeniedpage />
                                )
                            }
                        />
                    )
                })}
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
            </Routes>
        </div>
    )
}

export default App
