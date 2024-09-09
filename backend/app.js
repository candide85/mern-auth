import express from 'express'
import cors from 'cors'
import user_router from './routes/users.route.js'

const app = express()

app.use(express.json())

app.use(cors({
    // credentials: true,
    // origin: `http://localhost:5173`
}))

app.use("/api/v1", user_router)





export default app