import {
    Avatar,
    Button,
    Form,
    Image,
    Input,
    message,
    Popconfirm,
    Tooltip,
    Upload,
} from 'antd'
import { useEffect, useState } from 'react'
import { CameraFilled, UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import DefaultLayout from '../../layouts/DefaultLayout'
import { getBase64 } from '../../utils/readFile/image'
import { selectAuth } from '../../store/selector/authSelector'
import { fetchUpdateInfomation } from '../../store/actions/authAction'
import { reStateSuccess } from '../../store/slice/authSlice'

const Information = () => {
    const authState = useSelector(selectAuth)
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage()

    const [avatar, setAvatar] = useState(authState?.userInfo?.avatar || null)
    const [previewOpen, setPreviewOpen] = useState(false)
    const [isUpdateInfo, setIsUpdateInfo] = useState(false)

    // Re-state success
    useEffect(() => {
        if (authState.isSuccess) {
            dispatch(reStateSuccess())
        }
    }, [dispatch, authState.isSuccess])

    // giá trị ban đầu cho trường full_name
    useEffect(() => {
        if (authState.userInfo) {
            form.setFieldsValue({
                full_name: authState.userInfo.full_name || null,
            })
        }
    }, [authState.userInfo, form])

    // avatar
    const handleChangeFile = async ({ fileList }) => {
        const file = await getBase64(fileList[0].originFileObj)
        setAvatar(file)
    }

    const handlePreview = async (file) => {
        setPreviewOpen(true)
    }

    // xác nhận hủy thay đổi tên
    const confirmCancel = () => {
        setIsUpdateInfo(false)
        form.setFieldsValue({
            full_name: authState.userInfo.full_name || null,
        })
        setAvatar(authState?.userInfo?.avatar || null)
    }

    // submit thay đổi thông tin
    const onFinish = (values) => {
        dispatch(fetchUpdateInfomation({ avatar, full_name: values.full_name }))
        messageApi.open({
            type: 'success',
            content: authState?.message || 'Update thông tin thành công',
        })
        setIsUpdateInfo(false)
    }

    // cho phép update
    const onUpdateInfo = () => {
        setIsUpdateInfo(true)
    }

    return (
        <DefaultLayout>
            <h1 className='text-lg font-semibold uppercase'>
                Thông tin cá nhân
            </h1>
            <div className='flex flex-col items-center justify-center'>
                <div className='flex flex-col items-center gap-4'>
                    <Tooltip placement='bottom' title='Thay đổi ảnh đại diện'>
                        <Upload
                            className='cursor-pointer hover:opacity-80 relative'
                            accept='image/png, image/jpeg'
                            maxCount={1}
                            listType='picture-circle'
                            beforeUpload={(file) => {
                                return false
                            }}
                            showUploadList={false}
                            onPreview={handlePreview}
                            onChange={handleChangeFile}
                            disabled={!isUpdateInfo}
                        >
                            <Avatar
                                src={avatar}
                                size={100}
                                icon={!avatar && <UserOutlined />}
                            />
                            <CameraFilled className='text-base absolute bottom-0 right-0 text-white p-2 bg-slate-700 rounded-full' />
                        </Upload>
                    </Tooltip>
                    <span className='text-lg font-medium'>
                        {authState.userInfo?.full_name ??
                            authState.userInfo?.username}
                    </span>
                </div>
                <Form
                    form={form}
                    variant='filled'
                    layout='vertical'
                    className='w-[600px] mt-5'
                    onFinish={onFinish}
                >
                    <div className='w-[600px] mt-5'>
                        <Form.Item label='Full Name' name='full_name'>
                            <Input
                                disabled={!isUpdateInfo}
                                placeholder='Nhập tên hoặc biệt danh của bạn...'
                            />
                        </Form.Item>

                        <div className='flex items-center justify-between'>
                            <Link className='text-blue-500 underline'>
                                Đổi mật khẩu
                            </Link>
                            <Form.Item className='translate-y-1/2'>
                                {isUpdateInfo ? (
                                    <div>
                                        <Popconfirm
                                            title='Huỷ thay đổi'
                                            description='Bạn muốn hủy thay đổi thông tin cá nhân?'
                                            okText='Yes'
                                            cancelText='No'
                                            onConfirm={confirmCancel}
                                        >
                                            <Button
                                                type='primary'
                                                danger
                                                className='mr-4'
                                                disabled={authState?.isLoading}
                                            >
                                                Hủy thay đổi
                                            </Button>
                                        </Popconfirm>
                                        <Button
                                            type='primary'
                                            htmlType='submit'
                                            loading={authState?.isLoading}
                                        >
                                            Thay đổi
                                        </Button>
                                    </div>
                                ) : (
                                    <Tooltip title='Click vào đây để thay đổi thông tin cá nhân'>
                                        <Button
                                            type='primary'
                                            htmlType='submit'
                                            onClick={onUpdateInfo}
                                        >
                                            Thay đổi thông tin cá nhân
                                        </Button>
                                    </Tooltip>
                                )}
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
            {avatar && (
                <Image
                    wrapperStyle={{
                        display: 'none',
                    }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                    }}
                    src={avatar}
                />
            )}

            {contextHolder}
        </DefaultLayout>
    )
}

export default Information
