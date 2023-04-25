const mongoose=require("mongoose")


//connection string creation
mongoose.connect("mongodb://localhost:27017/bankServer",{useNewUrlParser:true})

//model creation
const User=mongoose.model("User",
{   
    //schema means feilds and values
    username:String,
    acno: Number,
    password: String,
    balance: Number,
    transaction:[] 
    
})
module.exports={
    User
}