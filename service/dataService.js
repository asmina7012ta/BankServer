const jwt=require("jsonwebtoken")

userDetails = {
    1000: { username: "amal", acno: 1000, password: "abc123", balance: 0, transaction: [] },
    1001: { username: "laalu", acno: 1001, password: "a1b2c3", balance: 0, transaction: [] },
    1002: { username: "ziya", acno: 1002, password: "123abc", balance: 0, transaction: [] },
    1003: { username: "raza", acno: 1003, password: "123456", balance: 0, transaction: [] },
    1004: { username: "aami", acno: 1004, password: "abcdefg", balance: 0, transaction: [] }

}
register = (acno, uname, psw) => {
    if (acno in userDetails) {
        return {
            status: false,
            message: "user already present",
            statuscode: 404
        }
    }
    else {
        userDetails[acno] = { username: uname, acno, password: psw, balance: 0, transaction: [] }
        return {
            status: true,
            message: "registerd",
            statuscode: 200
        }
    }
}
login = (acno, psw) => {
    if (acno in userDetails) {
        if (psw == userDetails[acno]["password"]) {
            currentUser = userDetails[acno]["username"]
            currentAcno = acno
            //create token
            const token=jwt.sign({acno},"secretkey")
            return {
                status: true,
                message: "login success",
                statuscode: 200,
                currentUser,
                currentAcno,token
            }
        } else {
            return {
                status: false,
                message: "incorrect password",
                statuscode: 404
            }
        }

    } else {
        return {
            status: false,
            message: "incorrect account number",
            statuscode: 404
        }
    }
}
deposit = (acno, psw, amount) => {
    var amnt = parseInt(amount)
    if (acno in userDetails) {
        if (psw = userDetails[acno]["password"]) {
            userDetails[acno]["balance"] += amnt
            userDetails[acno]["transaction"].push({ type: "creadit", Amount: amnt })
            return {
                status: true,
                message: `your a/c has been credited with amount${amount} 
            and the balence is ${userDetails[acno]["balance"]}`,
                statuscode: 200
        }}
        else {
            return {
                status: false,
                message: "incorect password",
                statuscode: 404
            }
        }
    }
    else {
        return {
            status: false,
            message: "incorrect acno",
            statuscode: 404
        }
    }
}
withdraw = (acno,psw,amount) => {
    var amnt = parseInt(amount)
    if (acno in userDetails) {
        if (psw == userDetails[acno]["password"]) {
            if (amount <= userDetails[acno]["balance"]) {
                userDetails[acno]["balance"] -= amnt
                userDetails[acno]["transaction"].push({ type: "debit", Amount: amnt })
                return {
                    status: true,
                    message: `your a/c has been debited with amount${amount} 
                    and the balence is ${userDetails[acno]["balance"]}`,
                    statuscode: 200
                }
            }
            else {
                return {
                    status: false,
                    message: "insufficient balance",
                    statuscode: 404
                } } 
            } else {
            return {
                status: false,
                message: "incorrect psw",
                statuscode: 404
            }}


    } else {
        return {
            status: false,
            message: "incorrect acno",
            statuscode: 404
           } 
            }
}
getTransaction=(acno)=> {
    return {
        status:true,
        transaction:userDetails[acno].transaction,
        statuscode:200
    }
  }

module.exports = {
    register,
    login,
    deposit,
    withdraw,
    getTransaction
}