import './App.css'
import {useState,useRef} from 'react'
import QRCode from 'react-qr-code'
import copySVG from '../assets/copy.svg'
import downloadSVG from '../assets/download.svg'
import html2canvas from 'html2canvas'
import checkSVG from '../assets/check.svg'
export default function Creqteqrcode(){
  const codeRef = useRef<HTMLDivElement | null>(null)
  const [toast,setToast] = useState<{ok:boolean,msg:string}>({ok:false,msg:''})
  const [text,setText] = useState('')
  const [create,setCreate] = useState(false)
  const [copied,setCopied] = useState(false)
  const [downloaded,setDownloaded] = useState(false)
  async function handleCopy(){
    if(!codeRef.current){return}
    try{
      const canvas = await html2canvas(codeRef.current,{ useCORS:true, logging:false })
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve,'image/png')
      })
      if (!blob) {
        throw new Error('Unable to create image blob')
      }
      const clipboardItem = new ClipboardItem({ 'image/png': blob })
      await navigator.clipboard.write([clipboardItem])
      setToast({msg:'Copied!',ok:true})
    }catch(err){
      setToast({msg:'An error occurred',ok:false})
    }
  }
  async function handleDownload(){
    if(!codeRef.current){return}
    try{
      const canvas = await html2canvas(codeRef.current,{ useCORS:true, logging:false })
      const dataURL = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.href = dataURL
      downloadLink.download = 'QRCode.png'
      downloadLink.click()
      setToast({msg:'Downloaded!',ok:true})
    }catch(err){
      setToast({msg:'An error occurred',ok:false})
    }
  }
  return (
    <div className='font-mono'>
      <div className='flex justify-center items-center flex-col'>
        <label htmlFor='text'>Text: {text}</label>
        <input id='text' type='text' className='text-center m-2 border border-black rounded-lg p-2' value={text} onChange={(e)=>{
          setText(e.target.value)
          setCreate(false)
        }
        } />
        <button className='m-2 border border-black rounded-lg p-2' onClick={()=>{
          if(create === false){
            setCreate(true)
          }
        }}>Generate</button>
        {create === true && text.length > 0 && (
          <div className='border border-slate-800 p-4 rounded-lg'>
            <h3 className='text-center m-2'>QR Code:</h3>
            <div ref={codeRef}>
            <QRCode size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={text}
            viewBox={`0 0 256 256`}
            />
            </div>
            <div>
              <button className='mt-4 border border-slate-600 rounded-lg p-2 hover:bg-gray-200 cursor-pointer' title='Copy'
              onClick={async () => {
                await handleCopy()
                setCopied(true)
                setTimeout(() => {
                  setCopied(false)
                }, 3000)
              }}><img src={copied === false ? copySVG : checkSVG}></img></button>
              <button className='mt-4 ml-4 border border-slate-600 rounded-lg p-2 hover:bg-gray-200 cursor-pointer' title='Download as .png'
              onClick={async () => {
                await handleDownload()
                setDownloaded(true)
                setTimeout(() => {
                  setDownloaded(false)
                }, 3000)
              }}
              ><img src={downloaded === false ? downloadSVG : checkSVG}></img></button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}