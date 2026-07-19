import './App.css'
import {useState} from 'react'
import Html5QrcodePlugin from './Qrcodescanner'
export default function Scanqrcode(){
    const [text,setText] = useState('')
    function onNewScanResult(decodedText:string,decodedeResult:any){
        setText(decodedText)
    }
    return (
        <div className='font-mono m-6'>
            <div className='flex justify-center items-center flex-col'>
                <div className="App">
                <Html5QrcodePlugin
                    fps={10}
                    qrbox={250}
                    disableFlip={false}
                    qrCodeSuccessCallback={onNewScanResult}
                />
                <h3>Scanned Text: {text}</h3>
            </div>
            </div>
        </div>
    )
}