import { Button, Form, Input, InputNumber, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CloseOutlined } from '@ant-design/icons'

import { selectMaps } from '../../../store/selector/mapsSelector'
import MapComponent from '../../Maps'
import { fetchGetAmentities } from '../../../store/actions/amentitiesAction'
import { selectAmentities } from '../../../store/selector/amentitiesSelector'
import { fetchSearchRoommate } from '../../../store/actions/tenant/roommateRequestAction'
import { selectRoommateRequest } from '../../../store/selector/roommateRequestSelector'
import LessThanOrEqual from '../../../assets/images/less-than-or-equal.png'
import { useSearchParams } from 'react-router-dom'

const SearchRoommateForm = () => {
    const dispatch = useDispatch()
    const mapsState = useSelector(selectMaps)
    const amentitiesState = useSelector(selectAmentities)
    const roommateRequestState = useSelector(selectRoommateRequest)
    const [form] = Form.useForm()
    const [searchParams, setSearchParams] = useSearchParams()

    const [isShowMaps, setIsShowMaps] = useState(false)
    const [habits, setHabits] = useState([])
    const [hobbies, setHobbies] = useState([])

    // get amentities
    useEffect(() => {
        dispatch(fetchGetAmentities())
    }, [])

    // maps
    const showMaps = () => {
        setIsShowMaps(true)
    }

    const handleClose = () => {
        setIsShowMaps(false)
    }

    // habits
    const handleAddHabits = (inputValue) => {
        if (!habits.some((option) => option.value === inputValue)) {
            setHabits((prevOptions) => [
                ...prevOptions,
                {
                    value: inputValue,
                    label: inputValue,
                },
            ])
        }
    }

    // hobbies
    const handleAddHobbies = (inputValue) => {
        if (!hobbies.some((option) => option.value === inputValue)) {
            setHobbies((prevOptions) => [
                ...prevOptions,
                {
                    value: inputValue,
                    label: inputValue,
                },
            ])
        }
    }

    // cập nhật address khi address trong map thay đổi
    useEffect(() => {
        if (mapsState?.selectionAddress?.display_name) {
            form.setFieldsValue({
                address: mapsState?.selectionAddress?.display_name,
            })
        }
    }, [mapsState?.selectionAddress, form])

    // handle submit form
    const hanldeSearchRoommate = (values) => {
        values = {
            ...values,
            lat: mapsState?.selectionAddress?.lat,
            lon: mapsState?.selectionAddress?.lon,
        }

        let params = {}
        const currentParams = {}
        searchParams.forEach((value, key) => {
            currentParams[key] = value
        })
        params.address = values.address
        params.lat = values.lat
        params.lon = values.lon
        params.radius = values.radius
        params.sex = values.sex
        params.habits = values.habits?.join(', ')
        params.hobbies = values.hobbies?.join(', ')
        params.amentities = values.amentities.join(', ')
        params.price = values.price

        setSearchParams({
            ...currentParams,
            ...params,
        })
    }

    return (
        <div className='flex flex-col items-center justify-center w-full mt-3 h-[550px] overflow-y-scroll'>
            <Form
                variant='filled'
                layout='vertical'
                className='w-[80%] h-full'
                onFinish={hanldeSearchRoommate}
                form={form}
                initialValues={{ radius: 5 }}
            >
                {/* địa chỉ phòng */}
                <Form.Item
                    label='Vị trí tìm kiếm'
                    name='address'
                    rules={[
                        {
                            required: true,
                            message: 'Trường này bắt buộc nhập!',
                        },
                    ]}
                >
                    <Input
                        placeholder='Nhập vị trí tìm kiếm'
                        readOnly
                        onClick={showMaps}
                    />
                </Form.Item>

                <Form.Item
                    label='Bán kính tìm kiếm (km)'
                    name='radius'
                    rules={[
                        {
                            required: true,
                            message: 'Trường này bắt buộc nhập!',
                        },
                    ]}
                >
                    <InputNumber
                        min={1}
                        prefix={
                            <img
                                src={LessThanOrEqual}
                                className='h-5 w-5'
                                alt='less than or equal'
                            />
                        }
                    />
                </Form.Item>

                {/* Giới tính */}
                <Form.Item
                    label='Giới tính'
                    name='sex'
                    rules={[
                        {
                            required: true,
                            message: 'Trường này bắt buộc nhập!',
                        },
                    ]}
                >
                    <Select
                        style={{ width: 120 }}
                        options={[
                            { value: 0, label: 'Nam' },
                            { value: 1, label: 'Nữ' },
                        ]}
                    />
                </Form.Item>

                {/* Giá phòng */}
                <Form.Item
                    label='Giá phòng có thể chấp nhận'
                    name='price'
                    rules={[
                        {
                            required: true,
                            message: 'Trường này bắt buộc nhập!',
                        },
                    ]}
                >
                    <InputNumber
                        min={1}
                        prefix={
                            <img
                                src={LessThanOrEqual}
                                className='h-5 w-5'
                                alt='less than or equal'
                            />
                        }
                    />
                </Form.Item>

                {/* Thói quen sinh hoạt */}
                <Form.Item
                    label='Thói quen sinh hoạt'
                    name='habits'
                    rules={[
                        {
                            required: true,
                            message: 'Trường này bắt buộc nhập!',
                        },
                    ]}
                >
                    <Select
                        mode='tags'
                        style={{
                            width: '100%',
                        }}
                        tokenSeparators={[',']}
                        options={habits}
                        onSelect={handleAddHabits}
                    />
                </Form.Item>

                {/* Sở thích */}
                <Form.Item
                    label='Sở thích'
                    name='hobbies'
                    rules={[
                        {
                            required: true,
                            message: 'Trường này bắt buộc nhập!',
                        },
                    ]}
                >
                    <Select
                        mode='tags'
                        style={{
                            width: '100%',
                        }}
                        tokenSeparators={[',']}
                        options={hobbies}
                        onSelect={handleAddHobbies}
                    />
                </Form.Item>

                {/* Tiện ích phòng */}
                <Form.Item
                    label='Tiện ích trong phòng'
                    name='amentities'
                    rules={[
                        {
                            required: true,
                            message: 'Trường này bắt buộc nhập!',
                        },
                    ]}
                >
                    <Select
                        mode='multiple'
                        options={amentitiesState?.amentities}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type='primary'
                        htmlType='submit'
                        className='w-full h-10'
                        loading={roommateRequestState?.isLoading}
                    >
                        Tìm kiếm kết quả phù hợp
                    </Button>
                </Form.Item>
            </Form>

            {isShowMaps && (
                <div className='fixed top-0 left-0 h-full w-full flex items-center justify-center bg-opacity-55 bg-black z-20'>
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

export default SearchRoommateForm
