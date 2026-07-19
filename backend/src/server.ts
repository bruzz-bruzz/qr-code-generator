import express from 'express'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import helmet from 'helmet'
import qrCode from './routes/Qrcode'
const app = express()
const rateLimiter = rateLimit({
    windowMs:60 * 1000,
    max:60,
    message:"Too many requests. Try again later",
    statusCode:429
})
app.use(cors({
    origin:'*'
}))
app.use(helmet())
app.use('/qrCode',qrCode)
app.listen(3000)