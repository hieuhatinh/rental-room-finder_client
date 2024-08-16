import {
    Button,
    Form,
    Image,
    Input,
    InputNumber,
    Select,
    Tag,
    Upload,
} from 'antd'

import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'

const options = [
    {
        value: 'gold',
    },
    {
        value: 'lime',
    },
    {
        value: 'green',
    },
    {
        value: 'cyan',
    },
]
const tagRender = (props) => {
    const { label, value, closable, onClose } = props
    const onPreventMouseDown = (event) => {
        event.preventDefault()
        event.stopPropagation()
    }
    return (
        <Tag
            color={value}
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

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })

const FormInfoRoom = () => {
    const [fileList, setFileList] = useState([])
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState('')

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

    // handle submit form
    const hanldeAddNewRoom = (values) => {
        console.log(values)
    }

    return (
        <>
            <div className='flex justify-center w-fill'>
                <Form
                    variant='filled'
                    layout='vertical'
                    className='max-w-[600px] flex-1'
                    onFinish={hanldeAddNewRoom}
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
                        <Input placeholder='Nhập địa chỉ phòng trọ' />
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
                        <InputNumber defaultValue={null} />
                    </Form.Item>

                    {/* Giá phòng */}
                    <Form.Item
                        label='Giá phòng'
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
                        label='Giá điện'
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
                        label='Giá nước/người'
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
                            options={options}
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
        </>
    )
}

export default FormInfoRoom
