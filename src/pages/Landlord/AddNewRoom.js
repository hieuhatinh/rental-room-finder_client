import LandlordLayout from '../../layouts/LandlordLayout'
import FormInfoRoom from '../../components/FormInfoRoom'

function AddNewRoom() {
    return (
        <LandlordLayout>
            <span className='block font-semibold text-lg mb-7'>
                Thêm phòng mới
            </span>

            <FormInfoRoom />
        </LandlordLayout>
    )
}

export default AddNewRoom
