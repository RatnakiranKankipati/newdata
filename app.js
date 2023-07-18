require("dotenv").config()
const mongoose=require("mongoose")
const express=require("express")
const cors=require("cors")
const userroute=require("./Routes/userRoute")
const app=express()
const port=process.env.PORT || 7000

app.use(cors())

app.use(express.json())

// users route
app.use("/gaylordusers",userroute)

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

app.listen(process.env.PORT,()=>{
    console.log("sever is connected")
})
// gaylordstatistics123
