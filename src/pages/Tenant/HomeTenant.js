import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'

import DefaultLayout from '../../layouts/DefaultLayout'
import CardRoom from '../../components/Card/CardRoom'
import { fetchGetSomeRooms } from '../../store/actions/tenant/roomsAction'
import { selectRoomsTenant } from '../../store/selector/tenantSelector'
import { LoadingOutlined } from '@ant-design/icons'

function HomeTenant() {
    const dispatch = useDispatch()
    const roomsTenantState = useSelector(selectRoomsTenant)

    useEffect(() => {
        dispatch(fetchGetSomeRooms())
    }, [])

    return (
        <DefaultLayout>
            {/* <h1 className='text-lg font-semibold'>Phòng trọ đề xuất</h1> */}
            {roomsTenantState?.isLoading ? (
                <div className='flex items-center justify-center'>
                    <Spin indicator={<LoadingOutlined size={40} spin />} />
                </div>
            ) : (
                <div className='grid grid-cols-4 gap-10 p-5 rounded-xl mt-2 bg-gradient-to-r from-teal-400 to-blue-500'>
                    {roomsTenantState?.someRooms?.map((room) => (
                        <CardRoom key={room.id_room} room={room} />
                    ))}
                </div>
            )}
        </DefaultLayout>
    )
}

export default HomeTenant
