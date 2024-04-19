import express from 'express'
import loginHandler from '../handlers/loginHandler.js'
import getOTPHandler from '../handlers/userHandlers/getOTPHandler.js'

const authRouter = express.Router()


authRouter.post('/login', loginHandler)
authRouter.post('/otp', getOTPHandler)

export default authRouter