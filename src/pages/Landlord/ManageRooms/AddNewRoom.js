import FormInfoRoom from '../../../components/Landlord/FormInfoRoom'
import LandlordLayout from '../../../layouts/LandlordLayout'

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
