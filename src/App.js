import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

import { landlordRoutes, tenantRoutes } from './routes'

function App() {
    const [user, setUser] = useState()
    const navigate = useNavigate()
    const getUser = async () => {
        try {
            const userInfo = await axios.get(
                'http://localhost:5000/auth/login/success',
                { withCredentials: true },
            )

            console.log(userInfo.data)

            setUser(userInfo.data.user)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [navigate])

    return (
        <div className='h-full'>
            <Routes>
                {landlordRoutes.map((item) => {
                    const Page = item.component
                    return <Route path={item.path} element={<Page />} />
                })}
                {tenantRoutes.map((item) => {
                    const Page = item.component
                    return <Route path={item.path} element={<Page />} />
                })}
            </Routes>
        </div>
    )
}

export default App
