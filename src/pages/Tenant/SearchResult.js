import { Pagination } from 'antd'
import CardSearchRoom from '../../components/Card/CardSearchRoom'
import DefaultLayout from '../../layouts/DefaultLayout'

const SearchResult = () => {
    return (
        <DefaultLayout>
            <h1 className='font-medium text-lg'>
                Kết quả tìm kiếm nhà trọ quanh khu vực Cầu Giấy, Hà nội
            </h1>
            <span className='text-sm italic text-gray-400'>
                (50 kết quả tìm kiếm)
            </span>
            <CardSearchRoom />
            <CardSearchRoom />
            <CardSearchRoom />
            <CardSearchRoom />
            <CardSearchRoom />
            <CardSearchRoom />
            <Pagination
                className='mt-6'
                align='center'
                defaultCurrent={1}
                total={100}
                showSizeChanger={false}
            />
        </DefaultLayout>
    )
}

export default SearchResult
