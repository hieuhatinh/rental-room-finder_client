import { useEffect } from 'react'
import { Avatar } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { fetchGetInfoLandlord } from '../../store/actions/admin/manageLandlords'
import { selectManageLandlord } from '../../store/selector/adminSelector'

const DetailInfo = ({ idLandlord }) => {
    const dispatch = useDispatch()
    const manageLandlordState = useSelector(selectManageLandlord)

    useEffect(() => {
        dispatch(fetchGetInfoLandlord({ idLandlord }))
    }, [idLandlord, dispatch])

    return (
        <div className='pt-2 flex items-start gap-4'>
            <Avatar
                src={manageLandlordState.landlordInfo?.profile_img}
                size={200}
            />

            <div className='flex flex-col items-start gap-2'>
                <h1 className='font-semibold text-lg'>
                    {manageLandlordState.landlordInfo?.full_name}
                </h1>
                <div>
                    <span className='font-medium mr-2'>Giới tính:</span>
                    <span>{manageLandlordState.landlordInfo?.gender}</span>
                </div>

                <div>
                    <span className='font-medium mr-2'>Hộ khẩu thường tú:</span>
                    <span>
                        {manageLandlordState.landlordInfo?.address_name}
                    </span>
                </div>

                <div>
                    <span className='font-medium mr-2'>Tuổi:</span>
                    <span>{manageLandlordState.landlordInfo?.age}</span>
                </div>

                <div>
                    <span className='font-medium mr-2'>Số điện thoại:</span>
                    <span>{manageLandlordState.landlordInfo.phone_number}</span>
                </div>
            </div>
        </div>
    )
}

export default DetailInfo
