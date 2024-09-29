import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Input, Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PlaceHolder from '../../assets/images/placeholder.png'
import {
    fetchGetAddressFromCoordinates,
    fetchGetAddressFromSearchText,
} from '../../store/actions/mapsAction'
import { selectMaps } from '../../store/selector/mapsSelector'
import { CloseCircleFilled, LoadingOutlined } from '@ant-design/icons'
import { selectPosition } from '../../store/slice/mapsSlice'

const icon = L.icon({
    iconUrl: PlaceHolder,
    iconSize: [40, 40],
})

function ResetCenterView(props) {
    const { selectPosition } = props
    const map = useMap()

    useEffect(() => {
        if (selectPosition) {
            map.setView(
                L.latLng(selectPosition?.lat, selectPosition?.lon),
                map.getZoom(),
                {
                    animate: true,
                },
            )
        }
    }, [selectPosition])

    return null
}

const MapComponent = () => {
    const dispatch = useDispatch()
    const mapsState = useSelector(selectMaps)

    const [searchText, setSearchText] = useState()
    const [showListAddress, setShowListAddress] = useState(false)
    const inputRef = useRef(null)
    const [latLng, setLatLng] = useState({
        lat: mapsState?.selectionAddress?.lat ?? 21.0283334,
        lng: mapsState?.selectionAddress?.lon ?? 105.854041,
    })

    const handleChangeSearch = (e) => {
        setSearchText(e.target.value)
    }

    const handleSearchAddress = () => {
        dispatch(fetchGetAddressFromSearchText({ searchText }))
    }

    const handleClearSearchText = () => {
        setSearchText('')
    }

    // chọn địa điểm khi search text hiển thị kết quả
    const handleSelectPosition = (item) => {
        setLatLng({ lat: item.lat, lng: item.lon })
        dispatch(selectPosition(item))
    }

    // thay đổi địa điểm
    const handleMarkerDragEnd = (e) => {
        const { lat, lng } = e.target.getLatLng()
        setLatLng({ lat, lng })
    }

    useEffect(() => {
        if (latLng.lat && latLng.lng) {
            dispatch(fetchGetAddressFromCoordinates({ ...latLng }))
        }
    }, [latLng])

    useEffect(() => {
        setSearchText(mapsState?.selectionAddress?.display_name)
    }, [mapsState?.selectionAddress])

    // show list address khi focus vào ô input
    const handleShowListAddress = () => {
        setShowListAddress(true)
    }

    const handleHideListAddress = (e) => {
        if (
            inputRef?.current &&
            inputRef.current?.contains(e.target) === false
        ) {
            setShowListAddress(false)
        }
    }

    // ẩn list address
    useEffect(() => {
        document.addEventListener('mousedown', handleHideListAddress)
        return () => {
            document.removeEventListener('mousedown', handleHideListAddress)
        }
    }, [])

    return (
        <div className='h-[600px] w-[800px] flex flex-col'>
            {/* Search */}
            <div
                ref={inputRef}
                className='relative bg-white rounded-md mb-2 mx-2'
                onFocus={handleShowListAddress}
            >
                <div className='flex items-start justify-start m-2 gap-2 h-[40px]'>
                    <Input.Search
                        placeholder='enter address'
                        value={searchText}
                        onChange={handleChangeSearch}
                        onSearch={handleSearchAddress}
                        enterButton='Search'
                        suffix={
                            <CloseCircleFilled
                                className='text-gray-400 text-base'
                                onClick={handleClearSearchText}
                            />
                        }
                    />
                </div>

                <div className='absolute top-[40px] left-0 w-full rounded-md bg-white max-h-[200px] z-30 overflow-auto'>
                    {mapsState.isLoading ? (
                        <Spin
                            indicator={<LoadingOutlined spin />}
                            size='large'
                            className='flex items-center justify-center h-[100px]'
                        />
                    ) : (
                        showListAddress &&
                        mapsState?.listAddress.map((item) => (
                            <div
                                key={item.osm_id}
                                className='cursor-pointer my-2 h-[40px] hover:bg-gray-300 bg-opacity-10  w-full'
                                onClick={() => handleSelectPosition(item)}
                            >
                                <p className='p-2'>{item.display_name}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Maps */}
            <div className='h-full w-full border-2 border-red-500 z-0'>
                <MapContainer
                    center={[latLng.lat, latLng.lng]}
                    zoom={15}
                    className='w-full h-full'
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}@2x.png?key=Plbtvhj0rmLo7RC2ZtK9'
                    />
                    {!!mapsState?.selectionAddress && (
                        <>
                            <Marker
                                position={[latLng.lat, latLng.lng]}
                                icon={icon}
                                draggable={true}
                                eventHandlers={{
                                    dragend: handleMarkerDragEnd,
                                }}
                            >
                                {mapsState.isLoading ? (
                                    <Spin
                                        indicator={<LoadingOutlined spin />}
                                        size='default'
                                        className='flex items-center justify-center'
                                    />
                                ) : (
                                    <Popup className='w-[400px]'>
                                        <div className='mt-2'>
                                            <span className='font-bold mr-2'>
                                                address:
                                            </span>
                                            {
                                                mapsState?.selectionAddress
                                                    .display_name
                                            }
                                        </div>
                                        <div className='mt-2'>
                                            <span className='font-bold mr-2'>
                                                lat:
                                            </span>
                                            {mapsState?.selectionAddress.lat}
                                        </div>
                                        <div className='mt-2'>
                                            <span className='font-bold mr-2'>
                                                lng:
                                            </span>
                                            {mapsState?.selectionAddress.lon}
                                        </div>
                                    </Popup>
                                )}
                            </Marker>
                            <ResetCenterView
                                selectPosition={{
                                    lat: mapsState?.selectionAddress?.lat,
                                    lon: mapsState?.selectionAddress?.lon,
                                }}
                            />
                        </>
                    )}
                </MapContainer>
            </div>
        </div>
    )
}

export default MapComponent
