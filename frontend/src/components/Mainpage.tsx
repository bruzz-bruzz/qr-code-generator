import './App.css'
import Createqrcode from './Createqrcode'
import Scanqrcode from './Scanqrcode'
import Github from './Github'
import {useState} from 'react'
export default function Mainpage(){
    const [page,setPage] = useState<'create' | 'scan'>('create')
    return (
        <div className='font-mono'>
            <div className='flex justify-center items-center flex-col'>
                <h1>QR Code Scanner/Generator</h1>
                <div className='grid grid-cols-2 gap-4 mt-4'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => setPage('create')}>
                        Create QR Code
                    </button>
                    <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={() => setPage('scan')}>
                        Scan QR Code
                    </button>
                </div>
                {page === 'create' && <Createqrcode />}
                {page === 'scan' && <Scanqrcode />}
            </div>
            <Github repo="qr-code-generator" apiLink="https://github.com/bruzz-bruzz/qr-code-generator/blob/main/backend/README_API.md" />
        </div>
    )
}