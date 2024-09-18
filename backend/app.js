import express from 'express'
import cors from 'cors'
import user_router from './routes/users.route.js'
import { errorHandler } from './utils/middlewares.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cookieParser())
// app.use(express.static('dist'))

app.use(cors({
    credentials: true,
    origin: `http://localhost:5173`
}))

app.use("/api/v1", user_router)
// app.use("/api/auth", user_router)

// app.use(errorHandler)



export default app