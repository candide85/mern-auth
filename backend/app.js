import express from 'express'
import cors from 'cors'


const app = express()


app.use(cors({
    // credentials: true,
    // origin: `http://localhost:5173`
}))

// app.use("/api", router)





export default app