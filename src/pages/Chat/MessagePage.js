import { Avatar, Spin } from 'antd'
import { EllipsisOutlined, UserOutlined } from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { SocketContext } from '../../services/SocketProvider'
import { selectAuth } from '../../store/selector/authSelector'
import StatusIndicator from '../../components/StatusIndicator'
import MessageInput from '../../components/Chat/MessageInput'
import ShowAllMessage from '../../components/Chat/ShowAllMessage'
import { setAllMessage } from '../../store/slice/fileSlice'
import { selectFile } from '../../store/selector/fileSelector'

const MessagePage = () => {
    // lấy thông tin của người dùng bằng socket.io, thể hiện người dùng online
    const params = useParams()
    const socketConnection = useContext(SocketContext)
    const authState = useSelector(selectAuth)
    const fileState = useSelector(selectFile)
    const dispatch = useDispatch()

    const [dataUser, setDataUser] = useState()
    const [isReceiverOnline, setIsReceiverOnline] = useState(false)

    // lấy các thông tin cần thiết như thông tin user, message
    useEffect(() => {
        if (socketConnection) {
            socketConnection.emit('message-page', params?.id_user)

            socketConnection.emit('seen', params?.id_user)

            socketConnection.on('message-user', (data) => {
                setDataUser(data)
            })

            socketConnection.on('message', (data) => {
                dispatch(setAllMessage(data))
            })

            const isReceiverOnline = authState?.onlineUsers.includes(
                params.id_user,
            )
            setIsReceiverOnline(isReceiverOnline)
        }
    }, [socketConnection, params.id_user, authState.onlineUsers, dispatch])

    return (
        <div className='relative'>
            <header className='sticky h-16 bg-white flex items-center justify-between py-4 px-8'>
                <div className='flex items-center'>
                    <StatusIndicator
                        position='right-1'
                        isOnline={isReceiverOnline}
                    >
                        <Avatar icon={<UserOutlined />} size={44} />
                    </StatusIndicator>

                    <div className='flex flex-col items-start ml-4'>
                        <h3 className='font-semibold text-lg'>
                            {dataUser?.username || dataUser?.full_name}
                        </h3>
                        {isReceiverOnline ? (
                            <span className='text-sm text-blue-400'>
                                online
                            </span>
                        ) : (
                            <span className='text-xs text-orange-500 font-medium'>
                                offline
                            </span>
                        )}
                    </div>
                </div>
                <EllipsisOutlined className='text-2xl font-extrabold hover:bg-gray-300 h-10 w-10 flex justify-center items-center rounded-full cursor-pointer' />
            </header>

            {/* Showw all message */}
            <ShowAllMessage />

            {/* send message */}
            <MessageInput />
            {fileState.isLoading && (
                <div className='z-40 absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30'>
                    <Spin size='large' />
                </div>
            )}
        </div>
    )
}

export default MessagePage
