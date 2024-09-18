import { signup, signin, google, test } from "../controllers/users.controller.js";
import express from 'express'

const user_router = express.Router()


user_router.post('/signup', signup)
            .post('/signin', signin)
            .post('/google', google)
            .get('/', test)




export default user_router