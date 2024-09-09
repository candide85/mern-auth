import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()


const PORT = process.env.PORT
const MONGO_DB_URI = process.env.MONGO_DB_URI

const CONNECTION_TO_MONGO_DB = mongoose.connect(MONGO_DB_URI)
.then(con => {
    console.log(`database connected ${con.connection.host}`);
})
.catch(error => {
    console.log(`something is going wrong, ${error}`);
})



export default {
    PORT, 
    MONGO_DB_URI,
    CONNECTION_TO_MONGO_DB
}