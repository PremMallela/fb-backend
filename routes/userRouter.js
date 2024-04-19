import express from 'express'
import  createUserHandler from '../handlers/userHandlers/createUserHandler.js'
import cookieParser from 'cookie-parser'
import authorize from '../middleware/authorize.js'
import updateUserHandler from '../handlers/userHandlers/updateUserHandler.js'
import logoutHandler from '../handlers/userHandlers/logoutHandler.js'

const userRouter = express.Router()

userRouter.post('/', createUserHandler)
userRouter.use(authorize)
userRouter.post('/logout',logoutHandler)
userRouter.patch('/',updateUserHandler)

export default userRouter