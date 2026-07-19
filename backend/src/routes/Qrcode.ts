import express,{ Request,Response } from "express";
import {body,validationResult} from 'express-validator'
import QRCode from 'qrcode'
const router = express.Router()
router.use(express.json())
type responseFormat = {
    ok:boolean,
    msg:string,
    data:null | string
}
router.post('/generateQRCode',[
    body("text").trim().escape().notEmpty()
],async (req:Request,res:Response<responseFormat>)=>{
    const errs = validationResult(req)
    if(!errs.isEmpty()){
        return res.status(400).json({ok:false,msg:"Error",data:null})
    }
    const result = await QRCode.toDataURL(req.body.text)
    return res.status(200).json({ok:true,msg:"Success",data:result})
})
export default router