import { useEffect, useState } from 'react'
import { Button, Modal, Pagination, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { FilterFilled, LoadingOutlined } from '@ant-design/icons'

import CardSearchRoom from '../../components/Card/CardSearchRoom'
import DefaultLayout from '../../layouts/DefaultLayout'
import {
    selectFilterSearch,
    selectRoomsTenant,
} from '../../store/selector/tenantSelector'
import { fetchSearchRooms } from '../../store/actions/tenant/roomsAction'
import Filter from '../../components/Tenant/Filter'
import { fetchGetAmentities } from '../../store/actions/amentitiesAction'
import { selectAmentities } from '../../store/selector/amentitiesSelector'

const SearchResult = () => {
    const dispatch = useDispatch()
    const amentitiesState = useSelector(selectAmentities)
    const roomsTenantState = useSelector(selectRoomsTenant)
    const filterSearchState = useSelector(selectFilterSearch)
    const { electricityPrice, roomPrice, waterPrice, amentities, capacity } =
        useSelector(selectFilterSearch)
    const [searchParams, setSearchParams] = useSearchParams()
    const [open, setOpen] = useState(false) // open model filter

    // search rooms
    useEffect(() => {
        dispatch(
            fetchSearchRooms({
                display_name: searchParams.get('address_name'),
                lat: searchParams.get('lat'),
                lon: searchParams.get('lon'),
                page: searchParams.get('page'),
                limit: searchParams.get('limit'),
                capacity: searchParams.get('capacity'),
                radius: searchParams.get('radius'),
                roomPrice: searchParams.get('roomPrice'),
                amentities: searchParams.get('amentities'),
                waterPrice: searchParams.get('waterPrice'),
                electricityPrice: searchParams.get('electricityPrice'),
            }),
        ).then(() => handleCancel())
    }, [searchParams, dispatch])

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

    // handle filter
    const showModelFilter = () => {
        setOpen(true)
        dispatch(fetchGetAmentities())
    }

    const handleCancel = () => setOpen(false)

    const handleFilter = () => {
        let params = {}
        const currentParams = {}
        searchParams.forEach((value, key) => {
            currentParams[key] = value
        })

        if (filterSearchState?.amentities) {
            params.amentities = filterSearchState?.amentities.join(',')
        }
        if (filterSearchState?.roomPrice) {
            params.roomPrice = filterSearchState?.roomPrice
        }
        if (filterSearchState?.waterPrice) {
            params.waterPrice = filterSearchState?.waterPrice
        }
        if (filterSearchState?.capacity) {
            params.capacity = filterSearchState?.capacity
        }
        if (filterSearchState?.electricityPrice) {
            params.electricityPrice = filterSearchState?.electricityPrice
        }

        setSearchParams({
            ...currentParams,
            ...params,
        })
    }

    return (
        <DefaultLayout>
            {roomsTenantState?.isLoading ? (
                <div className='flex items-center justify-center'>
                    <Spin size={48} indicator={<LoadingOutlined spin />} />
                </div>
            ) : (
                <>
                    <div className='flex items-start gap-10'>
                        <div>
                            <h1 className='font-medium text-lg'>
                                Kết quả tìm kiếm nhà trọ quanh khu vực{' '}
                                {searchParams.get('address_name')}
                            </h1>
                            <span className='text-sm italic text-gray-400'>
                                (
                                {
                                    roomsTenantState?.searchRoomsResult
                                        ?.totalItems
                                }{' '}
                                kết quả tìm kiếm)
                            </span>
                        </div>
                        <Button
                            type='primary'
                            icon={<FilterFilled />}
                            onClick={showModelFilter}
                        >
                            Lọc kết quả tìm kiếm
                        </Button>
                    </div>
                    {roomsTenantState?.searchRoomsResult?.items?.length > 0 ? (
                        <>
                            {roomsTenantState?.searchRoomsResult?.items?.map(
                                (room) => (
                                    <CardSearchRoom
                                        key={room.id_room}
                                        room={room}
                                    />
                                ),
                            )}
                            <Pagination
                                className='mt-6'
                                align='center'
                                defaultCurrent={
                                    roomsTenantState?.searchRoomsResult?.page
                                }
                                total={
                                    roomsTenantState?.searchRoomsResult
                                        ?.totalItems
                                }
                                defaultPageSize={
                                    roomsTenantState?.searchRoomsResult?.limit
                                }
                                showSizeChanger={false}
                                onChange={handlePageChange}
                            />
                        </>
                    ) : (
                        <div className='flex items-center justify-center h-14'>
                            <p>
                                Không có phòng trọ nào quanh bán kính 5km của
                                địa điểm mà bạn tìm{' '}
                            </p>
                        </div>
                    )}
                </>
            )}

            <Modal
                title={<p>Lọc kết quả tìm kiếm</p>}
                loading={amentitiesState?.isLoading}
                open={open}
                onCancel={handleCancel}
                footer={[
                    <Button key='cancel' onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                        key='filter'
                        type='primary'
                        disabled={
                            !electricityPrice &&
                            !roomPrice &&
                            !waterPrice &&
                            !amentities &&
                            !capacity
                        }
                        onClick={handleFilter}
                    >
                        Lọc
                    </Button>,
                ]}
            >
                {amentitiesState?.amentities && (
                    <Filter amentities={amentitiesState?.amentities} />
                )}
            </Modal>
        </DefaultLayout>
    )
}

export default SearchResult
