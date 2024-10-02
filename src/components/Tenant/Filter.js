import { Checkbox, Col, InputNumber, Row, Slider } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import LessThanOrEqual from '../../assets/images/less-than-or-equal.png'
import {
    setCapacity,
    setElectricityPrice,
    setRoomPrice,
    setSelectedAmentities,
    setWaterPrice,
} from '../../store/slice/tenant/filterSearchSlice'
import { selectFilterSearch } from '../../store/selector/tenantSelector'

const Filter = (props) => {
    const dispatch = useDispatch()
    const { electricityPrice, roomPrice, waterPrice, amentities, capacity } =
        useSelector(selectFilterSearch)

    const onChangeCapacity = (newValue) => {
        dispatch(setCapacity(newValue))
    }

    const onChangeRoomPrice = (newValue) => {
        dispatch(setRoomPrice(newValue))
    }

    const onChangeWaterPrice = (newValue) => {
        dispatch(setWaterPrice(newValue))
    }

    const onChangeElectricityPrice = (newValue) => {
        dispatch(setElectricityPrice(newValue))
    }

    const onChangeAmentities = (checkedValues) => {
        dispatch(setSelectedAmentities(checkedValues))
    }

    return (
        <div className='flex flex-col gap-3'>
            <div>
                <span className='font-semibold text-sm mb-2'>
                    Số người trong phòng
                </span>
                <InputNumber
                    className='mx-4'
                    value={capacity}
                    onChange={onChangeCapacity}
                />
            </div>
            <div>
                <span className='font-semibold text-sm mb-2'>
                    Giá phòng (triệu/phòng)
                </span>
                <InputNumber
                    min={1}
                    className='mx-4'
                    value={roomPrice}
                    prefix={
                        <img
                            src={LessThanOrEqual}
                            className='h-5 w-5'
                            alt='less than or equal'
                        />
                    }
                    onChange={onChangeRoomPrice}
                />
            </div>
            <div>
                <span className='font-semibold text-sm mb-2'>
                    Giá điện (nghìn/kwh)
                </span>
                <Row>
                    <Col span={12}>
                        <Slider
                            min={1}
                            max={5}
                            onChange={onChangeElectricityPrice}
                            value={
                                typeof electricityPrice === 'number'
                                    ? electricityPrice
                                    : 0
                            }
                        />
                    </Col>
                    <Col span={4}>
                        <InputNumber
                            min={1}
                            max={5}
                            className='mx-4'
                            value={electricityPrice}
                            prefix={
                                <img
                                    src={LessThanOrEqual}
                                    className='h-5 w-5'
                                    alt='less than or equal'
                                />
                            }
                            onChange={onChangeElectricityPrice}
                        />
                    </Col>
                </Row>
            </div>
            <div>
                <span className='font-semibold text-sm mb-2'>
                    Giá nước (nghìn/người/tháng)
                </span>
                <InputNumber
                    className='mx-4'
                    value={waterPrice}
                    prefix={
                        <img
                            src={LessThanOrEqual}
                            className='h-5 w-5'
                            alt='less than or equal'
                        />
                    }
                    onChange={onChangeWaterPrice}
                />
            </div>

            <div className='flex flex-col'>
                <span className='font-semibold text-sm mb-2'>
                    Các tiện ích trong phòng
                </span>
                <Checkbox.Group
                    options={props.amentities}
                    defaultValue={amentities}
                    onChange={onChangeAmentities}
                />
            </div>
        </div>
    )
}

export default Filter
