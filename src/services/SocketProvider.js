import { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'

import { getTokenFromCookies } from '../utils/store/token'
import { selectAuth } from '../store/selector/authSelector'
import { setIsOnline } from '../store/slice/authSlice'

export const SocketContext = createContext()

const SocketProvider = ({ children }) => {
    const authState = useSelector(selectAuth)
    const dispatch = useDispatch()
    const [socketConnection, setSocketConnection] = useState(null)

    useEffect(() => {
        if (authState?.token) {
            console.log('connect')
            const socketConnection = io(process.env.REACT_APP_BACKEND_URL, {
                auth: {
                    token: getTokenFromCookies(),
                },
            })

            socketConnection.on('isUserOnline', (data) => {
                dispatch(setIsOnline(data))
            })

            setSocketConnection(socketConnection)
            return () => {
                socketConnection.disconnect()
            }
        }
    }, [dispatch, authState.token])

    return (
        <SocketContext.Provider value={socketConnection}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider
