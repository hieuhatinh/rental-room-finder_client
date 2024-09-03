import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DefaultLayout from '../../layouts/DefaultLayout'
import CardRoom from '../../components/Card/CardRoom'
import { selectAuth } from '../../store/selector/authSelector'
import LoadingPage from '../Loading'
import { fetchLoginSuccess } from '../../store/actions/authAction'

function HomeTenant() {
    const dispatch = useDispatch()
    const authState = useSelector(selectAuth)

    useEffect(() => {
        if (
            authState.isSuccess &&
            !authState?.userInfo &&
            authState.token &&
            authState.isLoggedIn
        ) {
            dispatch(fetchLoginSuccess())
        }
    }, [
        authState.isSuccess,
        authState.userInfo,
        authState.token,
        authState.isLoggedIn,
        dispatch,
    ])

    return authState.isLoading ? (
        <LoadingPage />
    ) : (
        <DefaultLayout>
            <h1 className='text-lg font-semibold'>Phòng trọ đề xuất</h1>
            <div className='grid grid-cols-4 gap-10 p-5 rounded-xl mt-2 bg-gradient-to-r from-teal-400 to-blue-500'>
                <CardRoom />
                <CardRoom />
                <CardRoom />
                <CardRoom />
                <CardRoom />
            </div>
        </DefaultLayout>
    )
}

export default HomeTenant
