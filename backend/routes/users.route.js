import { signup, signin } from "../controllers/users.controller.js";
import express from 'express'

const user_router = express.Router()


user_router.post('/signup', signup)
            .post('/signin', signin)




export default user_router