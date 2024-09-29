import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Button, DatePicker, Form, Input, message } from 'antd'
import moment from 'moment'

import AdminLayout from '../../../layouts/AdminLayout'
import { phoneNumberRegex } from '../../../utils/validators'
import { selectManageLandlord } from '../../../store/selector/adminSelector'
import {
    fetchGetInfoLandlord,
    fetchUpdateInfoLandlord,
} from '../../../store/actions/admin/manageLandlordsAction'

const EditProfileLandlord = () => {
    const dispatch = useDispatch()
    let { id_landlord } = useParams()
    const manageLandlordState = useSelector(selectManageLandlord)
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        dispatch(fetchGetInfoLandlord({ idLandlord: id_landlord }))
    }, [id_landlord, dispatch])

    useEffect(() => {
        if (manageLandlordState.landlordInfo) {
            form.setFieldsValue({
                full_name: manageLandlordState.landlordInfo.full_name || null,
                address: manageLandlordState.landlordInfo?.address_name || null,
                phone_number:
                    manageLandlordState.landlordInfo.phone_number || null,
                birth_date: moment(
                    manageLandlordState.landlordInfo.birth_date,
                    'YYYY-MM-DD',
                ),
            })
        }
    }, [manageLandlordState.landlordInfo, form])

    const handleSubmitUpdate = (values) => {
        dispatch(
            fetchUpdateInfoLandlord({
                ...values,
                idLandlord: id_landlord,
                address_name: values.address,
                birth_date: values.birth_date.format('YYYY-MM-DD'),
            }),
        )
    }

    useEffect(() => {
        if (manageLandlordState.isSuccess) {
            messageApi.open({
                type: 'success',
                content: manageLandlordState.message,
            })
        }
    }, [manageLandlordState.message])

    return (
        <AdminLayout>
            <span className='inline-block font-bold text-xl mb-3'>
                Chỉnh sửa thông tin đối tác
            </span>

            <div className='flex items-start justify-start gap-10 mt-5'>
                <Avatar
                    src={manageLandlordState.landlordInfo?.profile_img}
                    size={200}
                />

                <Form
                    className='max-w-[500px]'
                    form={form}
                    onFinish={handleSubmitUpdate}
                >
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
                        <Input
                            placeholder='Nhập họ tên'
                            value={manageLandlordState.landlordInfo?.full_name}
                        />
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
                                message: 'Số điện thoại phải có 10 chữ số',
                            },
                        ]}
                    >
                        <Input placeholder='Nhập số diện thoại' />
                    </Form.Item>

                    <Form.Item
                        label='Ngày sinh'
                        name='birth_date'
                        hasFeedback
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <DatePicker format='YYYY-MM-DD' />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button
                            type='primary'
                            htmlType='submit'
                            loading={manageLandlordState.isLoading}
                        >
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            {contextHolder}
        </AdminLayout>
    )
}

export default EditProfileLandlord
