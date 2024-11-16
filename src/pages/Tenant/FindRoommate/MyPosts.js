import {
    Avatar,
    Button,
    Carousel,
    Dropdown,
    message,
    Modal,
    Pagination,
    Spin,
} from 'antd'
import {
    FileSearchOutlined,
    MoreOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { selectRoommateRequest } from '../../../store/selector/roommateRequestSelector'
import { LIMIT } from '../../../constants'
import {
    fetchDeletePost,
    fetchGetMyPostsRequest,
} from '../../../store/actions/tenant/roommateRequestAction'
import { convertToVnd, formattedDate } from '../../../utils/convertValue'

import EmptyBox from '../../../assets/images/empty-box.png'
import DefaultLayout from '../../../layouts/DefaultLayout'
import { resetState } from '../../../store/slice/tenant/roommateRequestSlice'
import PostCreationForm from '../../../components/Tenant/FindRoommate/PostCreationForm'

const nameModel = {
    PostCreation: 'PostCreation',
    DeletePost: 'DeletePost',
}

const MyPosts = () => {
    const dispatch = useDispatch()
    const roommateRequestState = useSelector(selectRoommateRequest)
    const [searchParams, setSearchParams] = useSearchParams()
    const [messageApi, contextHolder] = message.useMessage()

    const [openModel, setOpenModel] = useState(false)
    const [infoDelete, setInfoDelete] = useState()
    const [modelName, setModelName] = useState()

    // đặt params ban đầu
    useEffect(() => {
        setSearchParams({
            page: 1,
            limit: LIMIT,
        })
    }, [])

    // xử lý khi thay đổi page
    const handlePageChange = (newPage, newLimit) => {
        setSearchParams({
            page: newPage,
            limit: newLimit,
        })
    }

    // get all request
    useEffect(() => {
        const page = searchParams.get('page')
        const limit = searchParams.get('limit')
        if (page && limit) {
            dispatch(fetchGetMyPostsRequest({ page, limit }))
        }
    }, [searchParams, dispatch])

    // Hiển thị thông báo
    useEffect(() => {
        if (roommateRequestState?.isSuccess) {
            messageApi.open({
                type: 'success',
                content: roommateRequestState.message,
            })
            dispatch(resetState())
            handleCancel()
        } else if (roommateRequestState?.isError) {
            messageApi.open({
                type: 'error',
                content: roommateRequestState.message,
            })
        }
    }, [roommateRequestState, dispatch, searchParams])

    // Xóa post
    const handleDeletePost = ({ id, id_tenant }) => {
        setOpenModel(true)
        setModelName(nameModel.DeletePost)
        setInfoDelete({ id, id_tenant })
    }

    const handleOkDelete = () => {
        dispatch(fetchDeletePost({ ...infoDelete })).then(() => {
            handleCancel()
            setInfoDelete()
            const page = searchParams.get('page')
            const limit = searchParams.get('limit')
            if (page && limit) {
                dispatch(fetchGetMyPostsRequest({ page, limit }))
            }
        })
    }

    const handleCancel = () => {
        setOpenModel(false)
    }

    const showModalPostCreation = () => {
        setOpenModel(true)
        setModelName(nameModel.PostCreation)
    }

    return (
        <DefaultLayout>
            <div className='flex justify-between items-center'>
                <h1 className='font-semibold text-lg'>Bài đăng của tôi</h1>
                <Button
                    type='primary'
                    onClick={showModalPostCreation}
                    icon={<FileSearchOutlined />}
                >
                    Đăng bài tìm người ở ghép
                </Button>
            </div>
            {roommateRequestState?.isLoading ? (
                <Spin className='flex items-center justify-center' />
            ) : roommateRequestState?.myPosts?.items?.length > 0 ? (
                <>
                    <div className='grid grid-cols-6 h-full gap-3 mt-3'>
                        {roommateRequestState?.myPosts?.items?.map((item) => (
                            <div
                                key={item.id}
                                className='col-start-2 col-end-6 col-span-4 flex flex-col items-start h-fit gap-5 border rounded-md shadow-sm p-3'
                            >
                                <div className='flex items-center justify-between w-full'>
                                    <div className='flex items-start gap-3'>
                                        <Avatar
                                            style={{
                                                backgroundColor: '#87d068',
                                            }}
                                            icon={<UserOutlined />}
                                            src={item?.avatar}
                                            size={44}
                                        />

                                        <div className='flex flex-col items-start'>
                                            <span className='text-base font-semibold'>
                                                {item.full_name ||
                                                    item.username}
                                            </span>
                                            <span className='text-gray-500 font-normal text-sm italic'>
                                                Đăng ngày{' '}
                                                {formattedDate(item.created_at)}
                                            </span>
                                        </div>
                                    </div>

                                    <Dropdown
                                        menu={{
                                            items: [
                                                {
                                                    label: (
                                                        <Button
                                                            color='danger'
                                                            variant='text'
                                                            onClick={() =>
                                                                handleDeletePost(
                                                                    {
                                                                        id: item.id,
                                                                        id_tenant:
                                                                            item.id_tenant,
                                                                    },
                                                                )
                                                            }
                                                        >
                                                            Xóa bài đăng
                                                        </Button>
                                                    ),
                                                },
                                            ],
                                        }}
                                        trigger={['click']}
                                    >
                                        <MoreOutlined className='flex justify-center items-center h-8 w-8 rounded-full hover:bg-gray-300 text-lg' />
                                    </Dropdown>
                                </div>
                                <div className='px-5 pt-0'>
                                    {item?.images && (
                                        <Carousel
                                            arrows
                                            autoplay
                                            className='h-[250px] w-[250px]'
                                        >
                                            {item?.images?.map(
                                                (image, index) => (
                                                    <img
                                                        key={index}
                                                        src={image}
                                                        alt={image}
                                                        className='h-[250px] w-full object-cover'
                                                    />
                                                ),
                                            )}
                                        </Carousel>
                                    )}

                                    <div className='flex flex-col items-start gap-1 h-full'>
                                        <span className='font-semibold text-lg mb-3'>
                                            {item.title}
                                        </span>
                                        <span>
                                            <span className='font-semibold'>
                                                Địa chỉ:{' '}
                                            </span>
                                            {item.address_name}
                                        </span>
                                        <span>
                                            <span className='font-semibold'>
                                                Số người cần tìm:{' '}
                                            </span>
                                            {item.quantity}
                                        </span>
                                        <span>
                                            <span className='font-semibold'>
                                                Giới tính yêu cầu:{' '}
                                            </span>
                                            {item.gender === 0 ? 'Nam' : 'Nữ'}
                                        </span>
                                        <span>
                                            <span className='font-semibold'>
                                                Giá phòng:{' '}
                                            </span>
                                            {convertToVnd(item.price * 1000000)}
                                            /người
                                        </span>

                                        <span>
                                            <span className='font-semibold'>
                                                Thói quen sinh hoạt:{' '}
                                            </span>

                                            {item.habits.join(', ')}
                                        </span>
                                        <span>
                                            <span className='font-semibold'>
                                                Sở thích:{' '}
                                            </span>

                                            {item.hobbies.join(', ')}
                                        </span>
                                        <span>
                                            <span className='font-semibold'>
                                                Tiện ích phòng:{' '}
                                            </span>
                                            {item.amentities
                                                .map(
                                                    (item) =>
                                                        item.amentity_name,
                                                )
                                                .join(', ')}
                                        </span>
                                        <span>
                                            <span className='font-semibold'>
                                                Mô tả:{' '}
                                            </span>
                                            {item.description || 'Không có'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Pagination
                        className='mt-6'
                        align='center'
                        defaultCurrent={roommateRequestState?.myPosts?.page}
                        total={roommateRequestState?.myPosts?.totalItems}
                        defaultPageSize={roommateRequestState?.myPosts?.limit}
                        showSizeChanger={false}
                        onChange={handlePageChange}
                    />
                </>
            ) : (
                <div className='flex flex-col items-center mt-20'>
                    <img src={EmptyBox} alt='empty' className='h-20 w-20' />
                    <span>Không có bài đăng nào</span>
                </div>
            )}

            {modelName === nameModel.PostCreation ? (
                <Modal
                    title='Đăng bài tìm người ở ghép'
                    open={openModel}
                    onCancel={handleCancel}
                    width={750}
                    footer={null}
                    centered
                >
                    <PostCreationForm />
                </Modal>
            ) : (
                <Modal
                    title='Xóa bài viết'
                    open={openModel}
                    onOk={handleOkDelete}
                    okType='danger'
                    okText='Xóa'
                    cancelText='Cancel'
                    confirmLoading={roommateRequestState?.isLoading}
                    onCancel={handleCancel}
                >
                    <p>
                        Bài viết này sẽ xóa vĩnh viễn. Bạn có muốn xóa bài viết
                        này?
                    </p>
                </Modal>
            )}

            {contextHolder}
        </DefaultLayout>
    )
}

export default MyPosts
