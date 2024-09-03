const StatusIndicator = ({ children, position = 'left-1', isOnline }) => {
    return (
        <div className='relative'>
            <div
                className={`absolute bottom-0 ${position} z-20 rounded-full ${
                    isOnline ? 'bg-green-500' : 'bg-red-500'
                } h-3 w-3`}
            />
            {children}
        </div>
    )
}

export default StatusIndicator
