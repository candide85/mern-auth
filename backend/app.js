import express from 'express'
import cors from 'cors'
import user_router from './routes/users.route.js'
import { errorHandler } from './utils/middlewares.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cookieParser())
// app.use(express.static('dist'))

const corsOptions = {
    credentials: true,
    origin: 'mern-auth-ugt6-clfs2yzzv-candide85s-projects.vercel.app', // replace with your actual front-end URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    // origin: `http://localhost:5173`
  };

app.use(cors(corsOptions))

app.options('*', cors(corsOptions)); // Preflight requests for all routes




app.use("/api/v1", user_router)

app.use("/", user_router)
// app.use("/api/auth", user_router)

// app.use(errorHandler)



export default app