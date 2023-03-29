// import express and store in a variable
const express = require("express")
//import dataservice
const ds = require("./service/dataService")
const jwt=require("jsonwebtoken")

//app creation
const app = express()
//to convert all datas from json to js 
app.use(express.json())

//middleware creation
const jwtMiddleware=(req,res,next)=>{
    try{
    //access data from request body
    const token=req.headers['access_token']
    //veryfy the tocken with secret key
   const data=jwt.verify(token,"secretkey")
//    console.log(data);
   next()
}
catch{
    res.status(422).json({
        status:false,
        message:"please login",
        statuscode:404
    })
}
}

//resolve api

//register   ........post

app.post("/register", (req, res) => {
    const result = ds.register(req.body.acno, req.body.uname, req.body.psw)
    res.status(result.statuscode).json(result)
})
//login      ........get
app.post("/login", (req, res) => {

    const result = ds.login(req.body.acno, req.body.psw)
    res.status(result.statuscode).json(result)
})
//deposite   ........patch
app.post("/deposit",jwtMiddleware, (req, res) => {

    const result = ds.deposit(req.body.acno, req.body.psw, req.body.amount)
    res.status(result.statuscode).json(result)
})
//withdraw   ........patch
app.post("/withdraw",jwtMiddleware, (req, res) => {

    const result = ds.withdraw(req.body.acno, req.body.psw, req.body.amount)
    res.status(result.statuscode).json(result)
})
//delete     ........delete
//transaction........get
app.get("/Transaction",jwtMiddleware, (req, res) => {

    const result = ds.getTransaction(req.body.acno)
    res.status(result.statuscode).json(result)
})






//port set
app.listen(3000, () => {
    console.log("server started at port 3000");
})