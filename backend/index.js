const express =require('express')
const dotenv =require('dotenv')
const mongoose =require('mongoose')
const auth =require('./routes/auth')
const UserAuth =require('./routes/user')

dotenv.config();
const app =express()
app.use(express.json())
port= process.env.PORT || 5000 
mongoose.connect(process.env.MONGO_URL,{
    // useNewUrlParse:true,
    useUnifiedTopology:true,
    // useCreateIndex:true
}).then(console.log("MongoDB is Connected")).catch((err)=>{console.log(err)})

app.use('/api/auth' ,auth);
app.use('/api/user' ,UserAuth)

app.listen(port,()=>{
    console.log(`Lestenning at PORT :${port}`)
})



// mongodb+srv://admin:<password>@cluster0.9iqbknx.mongodb.net/?retryWrites=true&w=majority