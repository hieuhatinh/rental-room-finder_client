import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import CardUser from './CardUser'
import { SocketContext } from '../../services/SocketProvider'
import { selectAuth } from '../../store/selector/authSelector'
import { Input, Spin, Tooltip } from 'antd'
import {
    CloseCircleFilled,
    CloseOutlined,
    SearchOutlined,
} from '@ant-design/icons'
import { customConversations, searchUsersInSidebar } from '../../helpers/chat'

const Sidebar = () => {
    const socketConnection = useContext(SocketContext)
    const authState = useSelector(selectAuth)

    const [showInputSearch, setShowInputSearch] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [debouncedSearchText, setDebouncedSearchText] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [allUser, setAllUser] = useState([])
    const [initialUsers, setInitialUsers] = useState([])

    // sidebar chat
    useEffect(() => {
        if (socketConnection) {
            socketConnection.emit('sidebar', authState.userInfo.id_user)

            socketConnection.on('conversation', (data) => {
                const conversationUserData = customConversations({
                    data,
                    authState,
                })

                setAllUser(conversationUserData)
                setInitialUsers(conversationUserData)
            })
        }
    }, [socketConnection, authState])

    // useEffect để thực hiện debouncing
    useEffect(() => {
        if (searchText) {
            setIsLoading(true)
            const handler = setTimeout(() => {
                setDebouncedSearchText(searchText)
            }, 2000)

            return () => {
                clearTimeout(handler)
            }
        }
    }, [searchText])

    // useEffect để thực hiện tìm kiếm khi debouncedSearchText thay đổi
    useEffect(() => {
        if (debouncedSearchText) {
            const results = searchUsersInSidebar({
                allUser,
                authState,
                debouncedSearchText,
            })

            setAllUser(results)
            setIsLoading(false)
        }
    }, [debouncedSearchText, authState.userInfo])

    const onChangeSearch = (e) => {
        setSearchText(e.target.value)
    }

    const handleShowInputSearch = () => {
        setShowInputSearch(true)
    }

    const handleCloseInputSearch = () => {
        setShowInputSearch(false)
        setSearchText('')
    }

    const clearSearchText = () => {
        setSearchText('')
        setDebouncedSearchText('')
        setAllUser(initialUsers)
    }

    return (
        <div className='divide-y-2 w-full'>
            <header className='sticky flex flex-col items-start m-h-16 max-h-28 p-4 w-full gap-4'>
                <div className='flex items-center justify-between w-full'>
                    <h1 className='text-2xl font-bold'>Message</h1>

                    <Tooltip title='Tìm kiếm cuộc trò chuyện'>
                        <SearchOutlined
                            className='text-xl cursor-pointer'
                            onClick={handleShowInputSearch}
                        />
                    </Tooltip>
                </div>

                {showInputSearch && (
                    <div className='flex items-center justify-between w-full gap-2'>
                        <Input
                            placeholder='Tên người bạn muốn tìm kiếm...'
                            value={searchText}
                            suffix={
                                <CloseCircleFilled
                                    onClick={clearSearchText}
                                    className='text-slate-300'
                                />
                            }
                            onChange={onChangeSearch}
                        />
                        <Tooltip title='Đóng ô tìm kiếm' placement='bottom'>
                            <CloseOutlined
                                className='cursor-pointer text-lg'
                                onClick={handleCloseInputSearch}
                            />
                        </Tooltip>
                    </div>
                )}
            </header>

            {isLoading ? (
                <Spin className='flex items-center justify-center pt-10' />
            ) : allUser.length !== 0 ? (
                <section className='h-[calc(100vh-80px)] w-full'>
                    <div className='overflow-x-hidden overflow-y-auto h-full scrollbar'>
                        {allUser.map((item, index) => (
                            <CardUser key={index} data={item} />
                        ))}
                    </div>
                </section>
            ) : (
                <div className='flex items-center justify-center pt-[50%]'>
                    <p>Bạn chưa có đoạn chat nào</p>
                </div>
            )}
        </div>
    )
}

export default Sidebar
