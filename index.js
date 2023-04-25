// import express and store in a variable
const express = require("express")

//import dataservice
const ds = require("./service/dataService")

//import cors
const cors=require("cors")

//importjwts
const jwt=require("jsonwebtoken")

//app creation
const app = express()

//integrate app with frontend
app.use(cors({origin:'http://localhost:4200'}))

//to convert all datas from json to js 
app.use(express.json())

//middleware creation (tocken validation) router specific
const jwtMiddleware=(req,res,next)=>{
    try{
    //access data from request headers
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
    ds.register(req.body.acno, req.body.uname, req.body.psw).then(result=>{
        res.status(result.statuscode).json(result)

    })
})
//login      ........get
app.post("/login", (req, res) => {
        ds.login(req.body.acno, req.body.psw).then(result=>{
        res.status(result.statuscode).json(result)

    })
})
//deposite   ........patch
app.post("/deposit",jwtMiddleware, (req, res) => {

   ds.deposit(req.body.acno, req.body.psw, req.body.amount).then(result=>{
    res.status(result.statuscode).json(result)
   })
})
//withdraw   ........patch
app.post("/withdraw",jwtMiddleware, (req, res) => {

    ds.withdraw(req.body.acno, req.body.psw, req.body.amount).then(result=>{
        res.status(result.statuscode).json(result)

    })
})

//transaction........get
app.post("/transaction",jwtMiddleware, (req, res) => {

    ds.getTransaction(req.body.acno).then(result=>{
        res.status(result.statuscode).json(result)
    })
})
//delete     ........delete
app.delete("/delete/:acno",jwtMiddleware,(req,res)=>{
    ds.SdeleteAcc(req.params.acno).then(result=>{
        res.status(res.statuscode).json(result)
    })
})

//port set
app.listen(3000, () => {
    console.log("server started at port 3000");
})