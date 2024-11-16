import { generatePath, useSearchParams } from 'react-router-dom'
import {
    Avatar,
    Button,
    Carousel,
    message,
    Modal,
    Pagination,
    Popover,
} from 'antd'
import { FilterFilled, MessageOutlined, UserOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectRoommateRequest } from '../../../store/selector/roommateRequestSelector'
import { LIMIT } from '../../../constants'
import SearchRoommateForm from '../../../components/Tenant/FindRoommate/SearchRoommateForm'
import { convertToVnd, formattedDate } from '../../../utils/convertValue'
import {
    fetchGetAllRequest,
    fetchSearchRoommate,
} from '../../../store/actions/tenant/roommateRequestAction'
import { resetState } from '../../../store/slice/tenant/roommateRequestSlice'

import EmptyBox from '../../../assets/images/empty-box.png'
import ClearFilter from '../../../assets/images/clear-filter.png'
import { paths } from '../../../utils/pathsRoutes'
import DefaultLayout from '../../../layouts/DefaultLayout'

const PopoverContent = ({ item }) => {
    return (
        <div className='flex items-start gap-2'>
            <Avatar
                style={{
                    backgroundColor: '#87d068',
                }}
                icon={<UserOutlined />}
                src={item?.avatar}
                size={52}
            />
            <div className='flex flex-col items-start'>
                <span className='text-lg font-semibold'>
                    {item.full_name || item.username}
                </span>
                <span>
                    {item.user_gender?.toLowerCase() === 'male' ? 'Nam' : 'Nữ'}
                </span>
                <Button
                    color='primary'
                    variant='solid'
                    type='link'
                    href={generatePath(
                        `${paths.shared.chatApp}/${paths.shared.chatAppIdUser}`,
                        {
                            id_user: item.id_tenant,
                        },
                    )}
                    icon={<MessageOutlined />}
                    className='mt-3'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Chat với {item.full_name || item.username}
                </Button>
            </div>
        </div>
    )
}

const OthersPost = () => {
    const dispatch = useDispatch()
    const roommateRequestState = useSelector(selectRoommateRequest)
    const [searchParams, setSearchParams] = useSearchParams()
    const [messageApi, contextHolder] = message.useMessage()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isFilter, setIsFilter] = useState()

    const showModalSearchPost = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    // đặt params ban đầu
    useEffect(() => {
        setSearchParams({
            page: 1,
            limit: LIMIT,
        })
    }, [])

    // xử lý khi thay đổi page
    const handlePageChange = (newPage, newLimit) => {
        // lưu lại params
        const currentParams = {}
        searchParams.forEach((value, key) => {
            currentParams[key] = value
        })

        setSearchParams({
            ...currentParams,
            page: newPage,
            limit: newLimit,
        })
    }

    // get all request
    useEffect(() => {
        const page = searchParams.get('page')
        const limit = searchParams.get('limit')
        const address = searchParams.get('address')
        const lat = searchParams.get('lat')
        const lon = searchParams.get('lon')
        const radius = searchParams.get('radius')
        const sex = searchParams.get('sex')
        const habits = searchParams.get('habits')
        const hobbies = searchParams.get('hobbies')
        const amentities = searchParams.get('amentities')

        let isFilter =
            !!address ||
            !!lat ||
            !!lon ||
            !!radius ||
            !!sex ||
            !!habits ||
            !!hobbies ||
            !!amentities

        setIsFilter(isFilter)

        if (page && limit) {
            if (isFilter) {
                dispatch(
                    fetchSearchRoommate({
                        page,
                        limit,
                        lat,
                        lon,
                        radius,
                        sex,
                        habits,
                        hobbies,
                        amentities: amentities.split(', '),
                    }),
                )
            } else {
                dispatch(fetchGetAllRequest({ page, limit }))
            }
        }
    }, [searchParams, dispatch])

    const handleClearFilter = () => {
        const page = 1
        const limit = LIMIT
        setSearchParams({
            page,
            limit,
        })
    }

    // Hiển thị thông báo
    useEffect(() => {
        if (roommateRequestState?.isSuccess) {
            messageApi.open({
                type: 'success',
                content: roommateRequestState.message,
            })

            handleCancel()
            dispatch(resetState())
        } else if (roommateRequestState?.isError) {
            messageApi.open({
                type: 'error',
                content: roommateRequestState.message,
            })
        }
    }, [roommateRequestState])

    return (
        <DefaultLayout>
            <div className='flex justify-between items-center'>
                <h1 className='text-center font-semibold text-lg'>
                    Các bài đăng tìm bạn cùng phòng
                </h1>
                {isFilter ? (
                    <Button type='primary' onClick={handleClearFilter}>
                        <img
                            src={ClearFilter}
                            alt='clear filter'
                            className='h-6 w-6'
                        />
                        Huỷ lọc
                    </Button>
                ) : (
                    <Button
                        type='primary'
                        onClick={showModalSearchPost}
                        icon={<FilterFilled />}
                    >
                        Lọc bài đăng
                    </Button>
                )}
            </div>
            {roommateRequestState?.requests?.items?.length > 0 ? (
                <>
                    <div className='grid grid-cols-6 h-full gap-3 mt-3'>
                        {roommateRequestState?.requests?.items?.map((item) => (
                            <div
                                key={item.id}
                                className='col-start-2 col-end-6 col-span-4 flex flex-col items-start h-fit gap-5 border rounded-md shadow-sm p-3'
                            >
                                <div className='flex items-start gap-3'>
                                    <Popover
                                        content={<PopoverContent item={item} />}
                                    >
                                        <Avatar
                                            style={{
                                                backgroundColor: '#87d068',
                                            }}
                                            icon={<UserOutlined />}
                                            src={item?.avatar}
                                            size={44}
                                        />
                                    </Popover>

                                    <div className='flex flex-col items-start'>
                                        <Popover
                                            content={
                                                <PopoverContent item={item} />
                                            }
                                        >
                                            <span className='text-base font-semibold'>
                                                {item.full_name ||
                                                    item.username}
                                            </span>
                                        </Popover>
                                        <span className='text-gray-500 font-normal text-sm italic'>
                                            Đăng ngày{' '}
                                            {formattedDate(item.created_at)}
                                        </span>
                                    </div>
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
                        defaultCurrent={roommateRequestState?.requests?.page}
                        total={roommateRequestState?.requests?.totalItems}
                        defaultPageSize={roommateRequestState?.requests?.limit}
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

            {/* Model đăng bài */}
            <Modal
                title='Tìm người ở ghép'
                open={isModalOpen}
                onCancel={handleCancel}
                width={750}
                footer={null}
                centered
            >
                <SearchRoommateForm />
            </Modal>

            {/* Hiển thị thông báo */}
            {contextHolder}
        </DefaultLayout>
    )
}

export default OthersPost
