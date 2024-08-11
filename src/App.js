import { Button } from 'antd'
import { Routes, Route } from 'react-router-dom'

function App() {
    return (
        <div>
            <h1 className='text-red-400'>hello world</h1>
            <Button type='primary' className='bg-red-500'>
                click me!
            </Button>
            <Routes>
                <Route path='/new-page' element={<NewPage />} />
            </Routes>
        </div>
    )
}

const NewPage = () => {
    return (
        <div>
            <h1>new page</h1>
        </div>
    )
}

export default App
