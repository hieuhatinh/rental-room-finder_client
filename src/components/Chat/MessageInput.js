import { Dropdown, Input } from 'antd'
import {
    CloseCircleFilled,
    EyeOutlined,
    FileImageOutlined,
    PlayCircleOutlined,
    PlusOutlined,
    SendOutlined,
    VideoCameraAddOutlined,
} from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SocketContext } from '../../services/SocketProvider'
import { selectAuth } from '../../store/selector/authSelector'
import { selectFile } from '../../store/selector/fileSelector'
import {
    fetchDeleteFile,
    fetchUploadFile,
} from '../../store/actions/fileAction'
import {
    setCurrentShowFileIndex,
    setListFileUploadEmpty,
} from '../../store/slice/fileSlice'

const MessageInput = () => {
    const params = useParams()
    const socketConnection = useContext(SocketContext)
    const authState = useSelector(selectAuth)
    const fileState = useSelector(selectFile)
    const dispatch = useDispatch()

    const [textMessage, setTextMessage] = useState()

    // handle send message
    const handleSubmit = () => {
        if (textMessage || !!fileState?.listFileUpload) {
            if (socketConnection) {
                socketConnection.emit('new message', {
                    sender: authState?.userInfo.id_user,
                    receiver: params?.id_user,
                    text: textMessage,
                    listFileUpload: fileState.listFileUpload,
                    msgByUserId: authState?.userInfo.id_user,
                })

                socketConnection.emit('seen', params?.id_user)

                setTextMessage('')
                dispatch(setListFileUploadEmpty())
            }
        }
    }

    const onChange = (e) => {
        setTextMessage(e.target.value)
    }

    // delete file from cloudinary
    const handleRemovefile = async (file) => {
        dispatch(fetchDeleteFile({ public_id: file.public_id }))
    }

    // handle upload image/video
    const handleUploadFile = async (files) => {
        dispatch(fetchUploadFile({ files: [...files.target.files] }))
    }

    // show preview image/video
    const setCurrentShowFile = (file) => {
        const indexImgShow = fileState.listFileUpload.findIndex(
            (item) => item.public_id === file.public_id,
        )

        dispatch(
            setCurrentShowFileIndex({
                indexImgShow,
                currentListFile: fileState?.listFileUpload,
            }),
        )
    }

    const items = [
        {
            key: '1',
            label: (
                <form>
                    <label
                        htmlFor='uploadImage'
                        className='flex items-center cursor-pointer'
                    >
                        <FileImageOutlined className='text-lg mr-2 text-teal-500' />
                        <span>Tải ảnh lên</span>
                    </label>
                    <input
                        type='file'
                        accept='image/*'
                        name='fileImage'
                        id='uploadImage'
                        className='hidden'
                        onChange={handleUploadFile}
                        multiple
                    />
                </form>
            ),
        },
        {
            key: '2',
            label: (
                <form>
                    <label
                        htmlFor='uploadVideo'
                        className='flex items-center cursor-pointer'
                    >
                        <VideoCameraAddOutlined className='text-lg mr-2 text-indigo-500' />
                        <span>Tải video lên</span>
                    </label>
                    <input
                        type='file'
                        accept='video/*'
                        name='fileVideo'
                        id='uploadVideo'
                        className='hidden'
                        onChange={handleUploadFile}
                        multiple
                    />
                </form>
            ),
        },
    ]

    return (
        <section className='relative h-16'>
            {/* hiển thị ảnh tải lên */}
            <div className='absolute left-0 bottom-0 flex items-center justify-start mb-16'>
                {fileState.listFileUpload.map((file) => (
                    <div
                        key={file.public_id}
                        className='relative w-[100px] h-[100px] mx-2 cursor-pointer group bg-white mb-1'
                    >
                        {file.type === 'image' ? (
                            <img
                                src={file.url}
                                alt='file'
                                className='w-full h-full object-contain bg-white'
                            />
                        ) : (
                            <>
                                <video className='w-full h-full object-contain'>
                                    <source src={file.url} type='video/mp4' />
                                </video>
                                <PlayCircleOutlined className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-0 text-2xl bg-black rounded-full bg-opacity-30' />
                            </>
                        )}
                        <CloseCircleFilled
                            className='absolute -right-1 -top-1 z-20 text-base cursor-pointer text-zinc-400 bg-white rounded-full'
                            onClick={() => handleRemovefile(file)}
                        />
                        <div
                            className='absolute top-0 right-0 bottom-0 left-0 hidden gap-1 group-hover:flex items-center justify-center bg-black bg-opacity-40'
                            onClick={() => setCurrentShowFile(file)}
                        >
                            <EyeOutlined className='text-white z-20' />
                            <span className='text-white z-20'>Preview</span>
                        </div>
                    </div>
                ))}
            </div>
            <Input
                className='px-5 py-4 outline-none h-full'
                placeholder='Nhập tin nhắn...'
                value={textMessage}
                prefix={
                    <Dropdown
                        menu={{ items }}
                        placement='top'
                        trigger={['click']}
                        arrow
                    >
                        <PlusOutlined className='text-xl mr-4 cursor-pointer font-bold' />
                    </Dropdown>
                }
                suffix={
                    <SendOutlined
                        className='text-xl ml-4 cursor-pointer font-bold text-blue-500'
                        onClick={handleSubmit}
                    />
                }
                onPressEnter={handleSubmit}
                onChange={onChange}
            />
        </section>
    )
}

export default MessageInput
