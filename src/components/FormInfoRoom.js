import {
    Button,
    Form,
    Image,
    Input,
    InputNumber,
    message,
    Select,
    Tag,
    Upload,
} from 'antd'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getBase64 } from '../utils/readFile/image'
import MapComponent from './Maps'
import { selectMaps } from '../store/selector/mapsSelector'
import { fetchLandlordAddRoom } from '../store/actions/landlord/manageRoomsAction'
import { fetchGetAmentities } from '../store/actions/amentitiesAction'
import { selectAmentities } from '../store/selector/amentitiesSelector'
import { selectLandlordRoomState } from '../store/selector/landlordSelector'
import { reStateMessage } from '../store/slice/landlord/manageRoomsSlice'
import { SocketContext } from '../services/SocketProvider'
import { selectAuth } from '../store/selector/authSelector'
import { colorsOfTag } from '../constants'
import roles from '../utils/roles'

const tagRender = (props) => {
    const { label, value, closable, onClose } = props
    const onPreventMouseDown = (event) => {
        event.preventDefault()
        event.stopPropagation()
    }

    let indexColor = value % colorsOfTag.length

    return (
        <Tag
            color={colorsOfTag[indexColor]}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{
                marginInlineEnd: 4,
            }}
        >
            {label}
        </Tag>
    )
}

const FormInfoRoom = () => {
    const dispatch = useDispatch()
    const mapsState = useSelector(selectMaps)
    const amentitiesState = useSelector(selectAmentities)
    const manageRoomState = useSelector(selectLandlordRoomState)
    const authState = useSelector(selectAuth)
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()

    const [fileList, setFileList] = useState([])
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [isShowMaps, setIsShowMaps] = useState(false)

    const socketConnection = useContext(SocketContext)

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

    const onChange = ({ fileList: newFileList }) => {
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

    // cập nhật address khi address trong map thay đổi
    useEffect(() => {
        if (mapsState?.selectionAddress?.display_name) {
            form.setFieldsValue({
                address: mapsState?.selectionAddress?.display_name,
            })
        }
    }, [mapsState?.selectionAddress, form])

    // handle submit form
    const hanldeAddNewRoom = (values) => {
        dispatch(
            fetchLandlordAddRoom({
                ...values,
                images: values.images.map((item) => item.originFileObj),
                addressInfo: mapsState?.selectionAddress,
            }),
        )
            .then((result) => {
                messageApi.open({
                    type: 'success',
                    content: result.payload.message,
                })

                socketConnection.emit('new-room-created', {
                    userInfo: authState?.userInfo,
                    idNewRoom: result.payload.idNewRoom,
                })

                form.resetFields()

                setTimeout(() => {
                    dispatch(reStateMessage())
                }, 1000)
            })
            .catch((error) => {
                messageApi.open({
                    type: 'error',
                    content: error.payload.message,
                })
                setTimeout(() => {
                    dispatch(reStateMessage())
                }, 1000)
            })
    }

    return (
        <>
            <div className='flex justify-center w-fill'>
                <Form
                    variant='filled'
                    layout='vertical'
                    className='max-w-[600px] flex-1'
                    onFinish={hanldeAddNewRoom}
                    form={form}
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
                        label='Số người trong 1 phòng'
                        name='capacity'
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
                        label='Giá phòng (triệu VNĐ/phòng)'
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

                    {/* Giá điện */}
                    <Form.Item
                        label='Giá điện (nghìn VNĐ/Kwh)'
                        name='electricity_price'
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

                    {/* Giá nước */}
                    <Form.Item
                        label='Giá nước (nghìn VNĐ/người)'
                        name='water_price'
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

                    <Form.Item
                        label='Diện tích phòng (m²)'
                        name='room_area'
                        rules={[
                            {
                                required: true,
                                message: 'Trường này bắt buộc nhập!',
                            },
                        ]}
                    >
                        <InputNumber
                            addonBefore='m²'
                            min={0}
                            className='w-[200px]'
                        />
                    </Form.Item>
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
                            tagRender={tagRender}
                            options={amentitiesState?.amentities}
                        />
                    </Form.Item>
                    <Form.Item label='Mô tả phòng trọ' name='description'>
                        <Input.TextArea
                            rows={4}
                            placeholder='Viết mô tả về phòng của bạn...'
                        />
                    </Form.Item>

                    <Form.Item
                        label='Tải ảnh phòng trọ lên'
                        name='images'
                        valuePropName='fileList'
                        getValueFromEvent={(e) => {
                            return e?.fileList
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Please input!',
                            },
                        ]}
                    >
                        <Upload
                            accept='image/png, image/jpeg'
                            listType='picture-card'
                            fileList={fileList}
                            onChange={onChange}
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
                            loading={manageRoomState.isLoading}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
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

            {contextHolder}
        </>
    )
}

export default FormInfoRoom
