import { useEffect, useState } from 'react'
import { Pagination, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'

import CardSearchRoom from '../../components/Card/CardSearchRoom'
import DefaultLayout from '../../layouts/DefaultLayout'
import { selectRoomsTenant } from '../../store/selector/tenantSelector'
import { fetchSearchRooms } from '../../store/actions/tenant/roomsAction'
import { paths } from '../../utils/pathsRoutes'
import { LoadingOutlined } from '@ant-design/icons'

const SearchResult = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const roomsTenantState = useSelector(selectRoomsTenant)
    const [searchParams] = useSearchParams()
    const [displayName, setDisplayName] = useState(
        searchParams.get('address_name'),
    )
    const [lat, setLat] = useState(searchParams.get('lat'))
    const [lon, setLon] = useState(searchParams.get('lon'))
    const [page, setPage] = useState(searchParams.get('page'))
    const [limit, setLimit] = useState(searchParams.get('limit'))

    useEffect(() => {
        setDisplayName(searchParams.get('address_name'))
        setLat(searchParams.get('lat'))
        setLon(searchParams.get('lon'))
        setPage(searchParams.get('page'))
        setLimit(searchParams.get('limit'))
    }, [searchParams])

    useEffect(() => {
        dispatch(
            fetchSearchRooms({
                display_name: displayName,
                lat,
                lon,
                page,
                limit,
            }),
        )
    }, [displayName, lat, lon, page, limit, dispatch])

    const handlePageChange = (newPage, newLimit) => {
        navigate(
            `${paths.tenant.searchResult}?address_name=${displayName}
                    &lat=${lat}&lon=${lon}
                    &page=${newPage}&limit=${newLimit}`,
        )
    }

    return (
        <DefaultLayout>
            {roomsTenantState?.isLoading ? (
                <div className='flex items-center justify-center'>
                    <Spin size={48} indicator={<LoadingOutlined spin />} />
                </div>
            ) : (
                <>
                    <h1 className='font-medium text-lg'>
                        Kết quả tìm kiếm nhà trọ quanh khu vực {displayName}
                    </h1>
                    <span className='text-sm italic text-gray-400'>
                        ({roomsTenantState?.searchRoomsResult?.totalItems} kết
                        quả tìm kiếm)
                    </span>
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
        </DefaultLayout>
    )
}

export default SearchResult
