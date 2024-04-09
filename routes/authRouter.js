import express from 'express'
import loginHandler from '../handlers/loginHandler.js'

const authRouter = express.Router()


authRouter.post('/login', loginHandler)

export default authRouter