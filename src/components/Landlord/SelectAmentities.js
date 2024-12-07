import { Button, Divider, Input, Select, Spin, Tag } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useContext, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectAmentities } from '../../store/selector/amentitiesSelector'
import { colorsOfTag } from '../../constants'
import {
    fetchAddAmentity,
    fetchGetAmentitiesByLandlord,
} from '../../store/actions/amentitiesAction'
import { selectAuth } from '../../store/selector/authSelector'
import { SocketContext } from '../../services/SocketProvider'
import roles from '../../utils/roles'

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

const SelectAmentities = ({ messageApi, form }) => {
    const dispatch = useDispatch()
    const amentitiesState = useSelector(selectAmentities)
    const authState = useSelector(selectAuth)
    const socketConnection = useContext(SocketContext)

    const [amentity, setAmentity] = useState('')
    const inputAmentityRef = useRef(null)

    // add amentity
    const onNameChange = (event) => {
        setAmentity(event.target.value)
    }

    const addItem = async () => {
        if (authState?.userInfo.role === roles.landlord) {
            await dispatch(fetchAddAmentity({ amentity })).then((result) => {
                if (result.type.includes('rejected')) {
                    messageApi.open({
                        type: 'error',
                        content: result.payload,
                    })
                    setAmentity()
                } else if (result.type.includes('fulfilled')) {
                    messageApi.open({
                        type: 'success',
                        content: result.payload.message,
                    })
                    socketConnection.emit('new-amentity', {
                        userInfo: authState?.userInfo,
                        newAmentity: amentity,
                    })
                    dispatch(fetchGetAmentitiesByLandlord())
                    setAmentity()
                }
            })
        }
    }

    const handleFocus = () => {
        if (amentitiesState?.amentities.length === 0) {
            dispatch(fetchGetAmentitiesByLandlord())
        }
    }

    const handleSelect = (values) => {
        form.setFieldsValue({
            amentities: values,
        })
    }

    return (
        <Select
            mode='multiple'
            tagRender={tagRender}
            onFocus={handleFocus}
            onChange={handleSelect}
            dropdownRender={(menu) =>
                amentitiesState?.isLoading ? (
                    <div className='flex items-center justify-center'>
                        <Spin size='small' />
                    </div>
                ) : (
                    <>
                        {menu}
                        <Divider
                            style={{
                                margin: '8px 0',
                            }}
                        />
                        <div className='py-2 flex items-center w-full gap-4 px-4'>
                            <Input
                                placeholder='Please enter item'
                                ref={inputAmentityRef}
                                value={amentity}
                                onChange={onNameChange}
                                onKeyDown={(e) => e.stopPropagation()}
                                className='flex-1 grow'
                                required={false}
                            />
                            <Button
                                type='primary'
                                icon={<PlusOutlined />}
                                onClick={addItem}
                                disabled={!amentity}
                                loading={amentitiesState?.isLoading}
                            >
                                Add item
                            </Button>
                        </div>
                    </>
                )
            }
            options={amentitiesState?.amentities}
            optionRender={(option) => (
                <div className='flex items-center gap-4'>
                    <span className='flex-1'>{option.data.label}</span>
                    <span
                        role='img'
                        aria-label={option.data.label}
                        className={`${
                            option.data.status === 'pending'
                                ? 'text-yellow-500'
                                : option.data.status === 'approved'
                                ? 'text-green-500'
                                : 'text-red-500'
                        } text-sm`}
                    >
                        {option.data.status}
                    </span>
                </div>
            )}
        />
    )
}

export default SelectAmentities
