import { Button, Form, Image, Input, InputNumber, Select, Upload } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { useSearchParams } from 'react-router-dom'

import { getBase64 } from '../../../utils/readFile/image'
import { selectMaps } from '../../../store/selector/mapsSelector'
import MapComponent from '../../Maps'
import { fetchGetAmentities } from '../../../store/actions/amentitiesAction'
import { selectAmentities } from '../../../store/selector/amentitiesSelector'
import {
    fetchCreateRoommateRequest,
    fetchGetMyPostsRequest,
} from '../../../store/actions/tenant/roommateRequestAction'
import { selectRoommateRequest } from '../../../store/selector/roommateRequestSelector'
import { selectAuth } from '../../../store/selector/authSelector'

const PostCreationForm = () => {
    const dispatch = useDispatch()
    const mapsState = useSelector(selectMaps)
    const amentitiesState = useSelector(selectAmentities)
    const roommateRequestState = useSelector(selectRoommateRequest)
    const [form] = Form.useForm()
    const [searchParams] = useSearchParams()
    const authState = useSelector(selectAuth)

    const [fileList, setFileList] = useState([])
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [isShowMaps, setIsShowMaps] = useState(false)
    const [habits, setHabits] = useState([])
    const [hobbies, setHobbies] = useState([])

    // get amentities
    useEffect(() => {
        dispatch(fetchGetAmentities())
    }, [])

    // image upload
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setPreviewImage(file.url || file.preview)
        setPreviewOpen(true)
    }

    const onChangeImage = ({ fileList: newFileList }) => {
        setFileList(newFileList)
    }

    // format currency
    const formatterVnd = (value) => {
        let valueFormat = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return valueFormat
    }

    const parseCurrency = (value) => {
        return value?.replace(/\$\s?|(,*)/g, '')
    }

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
    const hanldeAddNewRequest = (values) => {
        values = {
            ...values,
            lat: mapsState?.selectionAddress?.lat,
            lon: mapsState?.selectionAddress?.lon,
        }
        dispatch(fetchCreateRoommateRequest(values)).then(() => {
            const page = searchParams.get('page')
            const limit = searchParams.get('limit')
            if (page && limit) {
                dispatch(fetchGetMyPostsRequest({ page, limit }))
            }
        })
    }

    return (
        <div className='flex flex-col items-center justify-center w-full mt-3 h-[550px] overflow-y-scroll'>
            <Form
                variant='filled'
                layout='vertical'
                className='w-[80%] h-full'
                onFinish={hanldeAddNewRequest}
                form={form}
                initialValues={{
                    gender:
                        authState?.userInfo?.gender.toLowerCase() === 'male'
                            ? 0
                            : 1,
                }}
            >
                {/* tiêu đề bài viết */}
                <Form.Item
                    label='Tiêu đề bài viết'
                    name='title'
                    rules={[
                        {
                            required: true,
                            message: 'Trường này bắt buộc nhập!',
                        },
                    ]}
                >
                    <Input placeholder='Nhập tiêu đề bài viết' />
                </Form.Item>

                {/* địa chỉ phòng */}
                <Form.Item
                    label='Địa chỉ phòng trọ'
                    name='address'
                    rules={[
                        {
                            required: true,
                            message: 'Trường này bắt buộc nhập!',
                        },
                    ]}
                >
                    <Input
                        placeholder='Nhập địa chỉ phòng trọ'
                        readOnly
                        onClick={showMaps}
                    />
                </Form.Item>

                {/* số người trong phòng*/}
                <Form.Item
                    label='Số người cần tìm'
                    name='quantity'
                    rules={[
                        {
                            required: true,
                            message: 'Trường này bắt buộc nhập!',
                        },
                    ]}
                >
                    <InputNumber min={1} />
                </Form.Item>

                {/* Giá phòng */}
                <Form.Item
                    label='Giá phòng (triệu VNĐ/người)'
                    name='price'
                    rules={[
                        {
                            required: true,
                            message: 'Trường này bắt buộc nhập!',
                        },
                    ]}
                >
                    <InputNumber
                        addonBefore='VNĐ'
                        min={0}
                        formatter={formatterVnd}
                        parser={parseCurrency}
                        className='w-[200px]'
                    />
                </Form.Item>

                {/* Giới tính */}
                <Form.Item
                    label='Giới tính'
                    name='gender'
                    rules={[
                        {
                            required: true,
                            message: 'Trường này bắt buộc nhập!',
                        },
                    ]}
                >
                    <Select
                        style={{ width: 120 }}
                        disabled
                        options={[
                            { value: 0, label: 'Nam' },
                            { value: 1, label: 'Nữ' },
                        ]}
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

                {/* Mô tả */}
                <Form.Item label='Mô tả' name='description'>
                    <Input.TextArea
                        rows={4}
                        placeholder='Viết mô tả về phòng của bạn...'
                    />
                </Form.Item>

                {/* Ảnh phòng trọ */}
                <Form.Item
                    label='Tải ảnh phòng trọ lên'
                    name='images'
                    valuePropName='fileList'
                    getValueFromEvent={(e) => {
                        return e?.fileList
                    }}
                >
                    <Upload
                        accept='image/png, image/jpeg'
                        listType='picture-card'
                        fileList={fileList}
                        onChange={onChangeImage}
                        onPreview={handlePreview}
                        beforeUpload={(file) => {
                            return false
                        }}
                        multiple
                    >
                        <button
                            style={{
                                border: 0,
                                background: 'none',
                            }}
                            type='button'
                        >
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Upload
                            </div>
                        </button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button
                        type='primary'
                        htmlType='submit'
                        className='w-full h-10'
                        loading={roommateRequestState?.isLoading}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>

            {previewOpen && (
                <Image
                    wrapperStyle={{
                        display: 'none',
                    }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                            !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}

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

export default PostCreationForm
