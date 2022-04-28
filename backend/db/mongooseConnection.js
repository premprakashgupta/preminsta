const mongoose=require("mongoose")

exports.mongooseConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true,useUnifiedTopology: true}).then(console.log("connect")).catch(error=>{
    console.log(error)
})
}

