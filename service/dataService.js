const jwt = require("jsonwebtoken")
const { trusted } = require("mongoose")
const db = require("./db")

//function
register = (acno, uname, psw) => {
    //this findOne operation is asychronous so we use then to access data
    //store the resolved output of findOne in a variable user
    return db.User.findOne({ acno }).then(user => {
        //if acno present in db then get the object of thAt user else null
        if (user) {
            return {
                status: false,
                message: "user already present",
                statuscode: 404
            }
        }
        else {
            newUser = new db.User({
                username: uname,
                acno: acno,
                password: psw,
                balance: 0,
                transaction: []
            })
            newUser.save()
            return {
                status: true,
                message: "registerd",
                statuscode: 200
            }
        }
    })

}
login = (acno, psw) => {
    return db.User.findOne({ acno, password: psw }).then(user => {
        if (user) {
            currentUser = user.username
            currentAcno = acno
            const token = jwt.sign({ acno }, "secretkey")
            return {
                status: true,
                message: "login success",
                statuscode: 200,
                currentUser,
                currentAcno,
                token
            }

        } else {
            return {
                status: false,
                message: "incorrect a/c number or password",
                statuscode: 404
            }

        }
    })

}
deposit = (acno, psw, amount) => {
    //TO Convert string to int
    var amnt = parseInt(amount)
    return db.User.findOne({ acno, password: psw }).then(user => {
        if (user) {
            user.balance += amnt
            user.transaction.push({ type: "creadit", Amount: amnt })
            user.save()
            return {
                status: true,
                message: `your a/c has been credited with amount ${amount} 
            and the balence is ${user.balance}`,
                statuscode: 200
            }
        } else {
            return {
                status: false,
                message: "incorect ac number or password",
                statuscode: 404
            }
        }
    })
}
withdraw = (acno, psw, amount) => {
    var amnt = parseInt(amount)
    return db.User.findOne({ acno, password: psw }).then(user => {
        if (user) {
            if (user.balance >= amnt) {
                user.balance -= amnt
                user.transaction.push({
                    type: "debit",
                    Amount: amnt
                })
                user.save()
                return {
                    status: true,
                    message: `your ac has been debited with amount ${amnt} 
                and the balence is ${user.balance}`,
                    statuscode: 200
                }
            }
            else {
                return {
                    status: false,
                    message: "insufficient balance",
                    statuscode: 404
                }
            }
        } else {
            return {
                status: false,
                message: "incorect ac number or password",
                statuscode: 404
            }
        }

    })
}
getTransaction = (acno) => {
    return db.User.findOne({acno}).then(user => {
        if (user) {
            return {
                status: true,
                transaction: user.transaction,
                statuscode: 200
            }
        }
    })
}
SdeleteAcc =(acno)=> {
   return db.User.deleteOne({acno}).then(user => {
        if (user) {
            return {
                status: true,
                message: "ac deleted",
                statuscode: 200
            }
        } else {
            return {
                status: false,
                message: "ac not present",
                statuscode: 401
            }
        }

    })
}

module.exports = {
    register,
    login,
    deposit,
    withdraw,
    getTransaction,
    SdeleteAcc
}