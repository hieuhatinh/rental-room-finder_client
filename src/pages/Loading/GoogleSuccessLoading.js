import { Spin } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { fetchLoginSuccessWithGoogle } from '../../store/actions/authAction'
import { selectAuth } from '../../store/selector/authSelector'
import { getTokenFromCookies } from '../../utils/store/token'
import { paths } from '../../utils/pathsRoutes'

const GoogleSuccessLoading = () => {
    const dispatch = useDispatch()
    const authState = useSelector(selectAuth)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchLoginSuccessWithGoogle())
    }, [])

    useEffect(() => {
        const existToken = getTokenFromCookies()
        if (authState.isSuccess && existToken) {
            navigate(paths.tenant.homeTenant)
        }
    }, [authState.isSuccess, navigate])

    return (
        authState.isLoading && (
            <div className='h-screen w-screen flex items-center justify-center'>
                <Spin size='large' />
            </div>
        )
    )
}

export default GoogleSuccessLoading
