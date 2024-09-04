import DefaultLayout from '../../layouts/DefaultLayout'
import CardRoom from '../../components/Card/CardRoom'

function HomeTenant() {
    return (
        <DefaultLayout>
            <h1 className='text-lg font-semibold'>Phòng trọ đề xuất</h1>
            <div className='grid grid-cols-4 gap-10 p-5 rounded-xl mt-2 bg-gradient-to-r from-teal-400 to-blue-500'>
                <CardRoom />
                <CardRoom />
                <CardRoom />
                <CardRoom />
                <CardRoom />
            </div>
        </DefaultLayout>
    )
}

export default HomeTenant
