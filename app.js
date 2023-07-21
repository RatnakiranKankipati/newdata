require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const userroute = require("./Routes/userRoute")
const columnroute=require("./Routes/columnRoute")
const app = express()
const port = process.env.PORT || 7000

app.use(cors())

app.use(express.json())

// users route
app.use("/gaylordusers", userroute)
app.use("/columnselector",columnroute)


mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URI,()=>{
    console.log("db is connected");
})



app.listen(process.env.PORT, () => {
    console.log("sever is connected")
})
// gaylordstatistics123
