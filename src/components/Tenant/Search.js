import { CloseOutlined } from '@ant-design/icons'
import { Flex, Form, Input } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import MapComponent from '../Maps'
import { selectMaps } from '../../store/selector/mapsSelector'
import { selectRoomsTenant } from '../../store/selector/tenantSelector'
import { paths } from '../../utils/pathsRoutes'
import { LIMIT } from '../../constants'

const Search = () => {
    const mapsState = useSelector(selectMaps)
    const roomsTenantState = useSelector(selectRoomsTenant)
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const [isShowMaps, setIsShowMaps] = useState(false)

    // maps
    const showMaps = () => {
        setIsShowMaps(true)
    }

    const handleClose = () => {
        setIsShowMaps(false)
    }

    // cập nhật address khi address trong map thay đổi
    useEffect(() => {
        if (mapsState?.selectionAddress?.display_name) {
            form.setFieldsValue({
                address: mapsState?.selectionAddress?.display_name,
            })
        }
    }, [mapsState?.selectionAddress, form])

    // handle search rooms
    const handleSearch = () => {
        // dispatch(
        //     fetchSearchRooms({ locationInfo: mapsState?.selectionAddress }),
        // ).then((response) => navigate(`${paths.tenant.searchResult}`))
        navigate(
            `${paths.tenant.searchResult}?address_name=${mapsState?.selectionAddress?.display_name}
                &lat=${mapsState?.selectionAddress?.lat}
                &lon=${mapsState?.selectionAddress?.lon}
                &page=1&limit=${LIMIT}`,
        )
    }

    return (
        <div>
            <Flex gap={10}>
                <Form className='flex' form={form}>
                    <Form.Item name='address'>
                        <Input.Search
                            placeholder='Tìm trọ theo khu vực bạn muốn'
                            enterButton='Tìm kiếm'
                            className='w-[450px]'
                            readOnly
                            onClick={showMaps}
                            onSearch={handleSearch}
                            loading={roomsTenantState?.isLoading}
                        />
                    </Form.Item>
                </Form>
            </Flex>

            {/* maps */}
            {isShowMaps && (
                <div className='fixed top-0 left-0 h-full w-full flex items-center justify-center bg-opacity-55 bg-black z-30'>
                    <CloseOutlined
                        className='absolute top-10 right-10 text-2xl font-bold text-white cursor-pointer'
                        onClick={handleClose}
                    />
                    <MapComponent />
                </div>
            )}
        </div>
    )
}

export default Search
