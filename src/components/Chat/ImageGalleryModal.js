import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'

import { selectFile } from '../../store/selector/fileSelector'
import { setChangeShowFileIndex } from '../../store/slice/fileSlice'

const ImageGalleryModal = () => {
    const dispatch = useDispatch()
    const fileState = useSelector(selectFile)

    // show preview video
    const closePreviewFile = (e) => {
        dispatch(setChangeShowFileIndex(-1))
    }

    const handlePrevFile = (e) => {
        e.stopPropagation()
        dispatch(
            setChangeShowFileIndex(
                (fileState.currentShowFileIndex + 1) %
                    fileState?.currentListFile?.length,
            ),
        )
    }

    const handlePostFile = (e) => {
        e.stopPropagation()
        dispatch(
            setChangeShowFileIndex(
                (fileState.currentShowFileIndex -
                    1 +
                    fileState?.currentListFile?.length) %
                    fileState?.currentListFile?.length,
            ),
        )
    }

    const stopPagination = (e) => e.stopPropagation()

    return (
        fileState.currentShowFileIndex !== null &&
        fileState.currentShowFileIndex >= 0 && (
            <div
                className='fixed top-0 right-0 w-full h-full z-30 bg-black bg-opacity-50 flex items-center justify-center'
                onClick={closePreviewFile}
            >
                <div className='h-[500px] w-[500px] rounded-lg'>
                    {fileState?.currentListFile[fileState?.currentShowFileIndex]
                        ?.type === 'video' ? (
                        <video
                            className='w-full h-full object-contain z-50 bg-black rounded-lg p-2'
                            controls
                        >
                            <source
                                src={
                                    fileState?.currentListFile[
                                        fileState?.currentShowFileIndex
                                    ]?.url
                                }
                                type='video/mp4'
                            />
                        </video>
                    ) : (
                        <img
                            className='w-full h-full object-contain z-50 bg-black rounded-lg p-2'
                            src={
                                fileState?.currentListFile[
                                    fileState?.currentShowFileIndex
                                ]?.url
                            }
                            alt={
                                fileState?.currentListFile[
                                    fileState?.currentShowFileIndex
                                ]?.name
                            }
                            onClick={stopPagination}
                        />
                    )}
                </div>
                <CloseOutlined
                    className='absolute top-10 right-10 rounded-full h-10 w-10 bg-black bg-opacity-30 z-40 flex items-center justify-center text-white text-2xl cursor-pointer'
                    onClick={closePreviewFile}
                />
                <LeftOutlined
                    className='absolute left-10 top-1/2 rounded-full h-10 w-10 -translate-y-1/2 bg-white bg-opacity-40 z-40 flex items-center justify-center text-white text-2xl cursor-pointer'
                    onClick={handlePrevFile}
                />
                <RightOutlined
                    className='absolute right-10 top-1/2 rounded-full h-10 w-10 -translate-y-1/2 bg-white bg-opacity-40 z-40 flex items-center justify-center text-white text-2xl cursor-pointer'
                    onClick={handlePostFile}
                />
            </div>
        )
    )
}

export default ImageGalleryModal
