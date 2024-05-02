require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const userroute = require("./Routes/userRoute")
const columnroute=require("./Routes/columnRoute")
const tokenroute=require("./Routes/tokenRoute")
const app = express()
const port = process.env.PORT || 7000

app.use(cors())

app.use(express.json())

// users route
app.use("/gaylordusers", userroute)
app.use("/token", tokenroute)
app.use("/columnselector",columnroute)


mongoose.set('strictQuery', false);

mongoose.connect("mongodb+srv://gaylordadmin:AMcFXwieB9vsuwJr@cluster0.yevdijq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",()=>{
    console.log("db is connected");
})



app.listen(process.env.PORT, () => {
    console.log("sever is connected")
})
// gaylordstatistics123
