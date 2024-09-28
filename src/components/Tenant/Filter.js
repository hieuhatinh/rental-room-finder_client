import { Checkbox, Col, InputNumber, Row, Slider } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import LessThanOrEqual from '../../assets/images/less-than-or-equal.png'
import { setFilterPrameter } from '../../store/slice/tenant/filterSearchSlice'

const Filter = ({ amentities }) => {
    const dispatch = useDispatch()
    const [electricityPrice, setElectricityPrice] = useState()
    const [roomPrice, setRoomPrice] = useState()
    const [waterPrice, setWaterPrice] = useState()
    const [amentitiesSelected, setAmentitiesSelected] = useState(amentities)

    const onChangeRoomPrice = (newValue) => {
        setRoomPrice(newValue)
    }

    const onChangeWaterPrice = (newValue) => {
        setWaterPrice(newValue)
    }

    const onChangeElectricityPrice = (newValue) => {
        setElectricityPrice(newValue)
    }

    const onChangeAmentities = (checkedValues) => {
        setAmentitiesSelected(checkedValues)
    }

    useEffect(() => {
        dispatch(
            setFilterPrameter({
                electricityPrice,
                roomPrice,
                waterPrice,
                amentities: amentitiesSelected,
            }),
        )
    }, [electricityPrice, roomPrice, waterPrice, amentitiesSelected, dispatch])

    return (
        <div className='flex flex-col gap-3'>
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
                    options={amentities}
                    defaultValue={amentitiesSelected?.map((item) => item.value)}
                    onChange={onChangeAmentities}
                />
            </div>
        </div>
    )
}

export default Filter
