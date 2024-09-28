import {
    Avatar,
    Button,
    DatePicker,
    Form,
    Input,
    message,
    Modal,
    Select,
    Tooltip,
    Upload,
} from 'antd'
import {
    CameraFilled,
    EyeInvisibleOutlined,
    EyeTwoTone,
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import AdminLayout from '../../../layouts/AdminLayout'
import { phoneNumberRegex } from '../../../utils/validators'
import { getBase64 } from '../../../utils/readFile/image'
import { paths } from '../../../utils/pathsRoutes'
import { fetchAddNewLandlord } from '../../../store/actions/admin/manageLandlordsAction'
import { selectManageLandlord } from '../../../store/selector/adminSelector'

const AddLandlord = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const manageLandlordState = useSelector(selectManageLandlord)

    const [profileImg, setProfileImg] = useState()
    const [form] = Form.useForm()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [messageApi, contextHolder] = message.useMessage()

    // tải lên file
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e
        }
        return e?.fileList
    }

    const handleChangeFile = async ({ fileList }) => {
        const file = await getBase64(fileList[0].originFileObj)
        setProfileImg(file)
        form.setFieldsValue({ profile_img: fileList[0].originFileObj })
    }

    // submit
    const handleFinish = (values) => {
        dispatch(
            fetchAddNewLandlord({
                ...values,
                birth_date: values.birth_date.format('YYYY-MM-DD'),
            }),
        )
            .then(() => {
                form.resetFields()
                setProfileImg()
                form.setFieldsValue({ profile_img: null })
                messageApi.open({
                    type: 'success',
                    content: manageLandlordState.message,
                })
            })
            .catch((error) =>
                messageApi.open({
                    type: 'error',
                    content: manageLandlordState.message,
                }),
            )
    }

    // xác nhận hủy thêm mới
    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleCancelAddLandlord = () => {
        navigate(paths.admin.manageLandlords)
    }

    return (
        <AdminLayout>
            <span className='inline-block font-bold text-xl mb-3'>
                Thêm đối tác mới
            </span>

            <div className='flex flex-col items-center justify-center gap-10 mt-5'>
                <Form
                    className='w-[800px] flex flex-col items-center'
                    onFinish={handleFinish}
                    form={form}
                >
                    <Form.Item
                        name='profile_img'
                        valuePropName='fileList'
                        getValueFromEvent={normFile}
                        rules={[
                            {
                                required: true,
                                message: 'Tải lên ảnh profile',
                            },
                        ]}
                    >
                        <Tooltip placement='bottom' title='Tải lên ảnh profile'>
                            <Upload
                                name='photo'
                                listType='picture'
                                showUploadList={false}
                                beforeUpload={() => false}
                                maxCount={1}
                                accept='image/*'
                                onChange={handleChangeFile}
                                className='cursor-pointer hover:opacity-80 relative'
                            >
                                <Avatar
                                    src={profileImg}
                                    size={100}
                                    icon={!profileImg && <UserOutlined />}
                                    className='object-contain'
                                />
                                <CameraFilled className='text-base absolute bottom-0 right-0 translate-y-10 text-white p-2 bg-slate-700 rounded-full' />
                            </Upload>
                        </Tooltip>
                    </Form.Item>
                    <div className='flex w-full gap-5'>
                        {/* Thông tin chủ phòng */}
                        <div className='flex-1'>
                            <span className='inline-block text-lg font-medium mb-2'>
                                Thông tin chủ phòng
                            </span>
                            <Form.Item
                                label='Họ tên'
                                name='full_name'
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nhập họ tên',
                                    },
                                ]}
                            >
                                <Input placeholder='Nhập họ tên' />
                            </Form.Item>

                            <Form.Item
                                label='Giới tính'
                                name='gender'
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Chọn giới tính',
                                    },
                                ]}
                            >
                                <Select placeholder='--- Chọn giới tính ---'>
                                    <Select.Option value='male'>
                                        Nam
                                    </Select.Option>
                                    <Select.Option value='female'>
                                        Nữ
                                    </Select.Option>
                                    <Select.Option value='other'>
                                        Khác
                                    </Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label='Hộ khẩu thường trú'
                                name='address'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nhập hộ khẩu thường trú',
                                    },
                                ]}
                            >
                                <Input placeholder='Nhập hộ khẩu thường trú' />
                            </Form.Item>

                            <Form.Item
                                label='Số điện thoại'
                                name='phone_number'
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nhập số điện thoại liên hệ',
                                    },
                                    {
                                        pattern: phoneNumberRegex,
                                        message:
                                            'Số điện thoại phải có 10 chữ số và là số Việt Nam',
                                    },
                                ]}
                            >
                                <Input placeholder='Nhập số diện thoại' />
                            </Form.Item>

                            <Form.Item
                                label='Ngày sinh'
                                name='birth_date'
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input!',
                                    },
                                ]}
                            >
                                <DatePicker />
                            </Form.Item>
                        </div>

                        {/* Tài khoản chủ phòng */}
                        <div className='flex-1'>
                            <span className='inline-block text-lg font-medium mb-2'>
                                Tài khoản đăng nhập vào website
                            </span>
                            <Form.Item
                                name='username'
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nhập username',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder='Username'
                                />
                            </Form.Item>
                            <Form.Item
                                name='password'
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'nhập password',
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder='Password'
                                    iconRender={(visible) =>
                                        visible ? (
                                            <EyeTwoTone />
                                        ) : (
                                            <EyeInvisibleOutlined />
                                        )
                                    }
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <Form.Item>
                        <Button
                            type='primary'
                            className='mr-4'
                            danger
                            onClick={showModal}
                        >
                            Hủy bỏ
                        </Button>
                        <Button
                            type='primary'
                            htmlType='submit'
                            loading={manageLandlordState.isLoading}
                        >
                            Thêm mới
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <Modal
                title='Hủy đăng ký chủ phòng'
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button onClick={handleCancel}>Cancel</Button>,
                    <Button
                        type='primary'
                        danger
                        onClick={handleCancelAddLandlord}
                    >
                        Đồng ý hủy
                    </Button>,
                ]}
            >
                Xác nhận hủy thông tin đăng ký mới chủ phòng
            </Modal>

            {/* hiển thị message thông báo success/lỗi */}
            {contextHolder}
        </AdminLayout>
    )
}

export default AddLandlord
