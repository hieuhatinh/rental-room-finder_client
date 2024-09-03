import { EyeOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { useEffect, useRef } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'

import { selectFile } from '../../store/selector/fileSelector'
import { selectAuth } from '../../store/selector/authSelector'
import { setCurrentShowFileIndex } from '../../store/slice/fileSlice'

const ShowAllMessage = () => {
    const authState = useSelector(selectAuth)
    const fileState = useSelector(selectFile)
    const dispatch = useDispatch()

    const currentMessage = useRef()

    // cuộn xuống dưới
    useEffect(() => {
        if (currentMessage.current) {
            currentMessage.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            })
        }
    }, [fileState?.allMessage])

    // show image/video
    const setCurrentShowFile = (file) => {
        const indexImgShow = fileState?.allFileInMessage.findIndex(
            (item) => item.public_id === file.public_id,
        )

        dispatch(
            setCurrentShowFileIndex({
                indexImgShow,
                currentListFile: fileState.allFileInMessage,
            }),
        )
    }

    return (
        <section className='h-[calc(100vh-128px)] flex-1 py-5 overflow-x-hidden overflow-y-scroll scrollbar'>
            <div className='flex flex-col gap-2 mx-3' ref={currentMessage}>
                {fileState?.allMessage?.map((message, index) => {
                    const isUserMessage =
                        authState.userInfo.id_user === message.msgByUserId

                    return (
                        <div
                            key={index}
                            className={`w-fit ${
                                isUserMessage ? 'ml-auto' : ''
                            }`}
                        >
                            {message?.text && (
                                <p className='bg-white py-2 px-4 rounded-[8px]'>
                                    {message?.text}
                                </p>
                            )}
                            <div
                                className={`grid gap-2`}
                                style={{
                                    gridTemplateColumns: `repeat(${
                                        message?.filesUpload?.length < 4
                                            ? message?.filesUpload?.length
                                            : 4
                                    }, minmax(0, 1fr))`,
                                    direction: isUserMessage ? 'rtl' : 'ltr',
                                }}
                            >
                                {!!message?.filesUpload &&
                                    message?.filesUpload.map((file) => (
                                        <div
                                            key={file.id}
                                            className='relative group col-span-1 w-[150px] h-[150px] bg-white py-2 px-4 rounded-[8px] cursor-pointer'
                                            style={{
                                                direction: isUserMessage
                                                    ? 'rtl'
                                                    : 'ltr',
                                            }}
                                        >
                                            {file.type === 'image' ? (
                                                <img
                                                    src={file.url}
                                                    alt='file'
                                                    className='w-full h-full object-contain'
                                                />
                                            ) : (
                                                <>
                                                    <video className='w-full h-full object-contain'>
                                                        <source
                                                            src={file.url}
                                                            type='video/mp4'
                                                        />
                                                    </video>
                                                    <PlayCircleOutlined className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-0 text-2xl bg-black rounded-full bg-opacity-30' />
                                                </>
                                            )}
                                            <div
                                                className='absolute top-0 right-0 bottom-0 left-0 hidden gap-1 group-hover:flex items-center justify-center bg-black bg-opacity-40 rounded-[8px]'
                                                onClick={() =>
                                                    setCurrentShowFile(file)
                                                }
                                            >
                                                <span className='text-white z-20'>
                                                    Show
                                                </span>
                                                <EyeOutlined className='text-white z-20' />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <span
                                className={`block text-xs ${
                                    isUserMessage ? 'text-end' : 'text-start'
                                } mt-1`}
                            >
                                {moment(message.createAt).format('hh:mm')}
                            </span>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default ShowAllMessage
