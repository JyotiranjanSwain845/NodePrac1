const jwt = require('jsonwebtoken')

function createToken(email,password){
    try {
        const secrete = process.env.secrete;
        const userToken = jwt.sign({email,password},secrete);
        return userToken;
        
    } catch (error) {
        throw new Error("SOmething went wrong generating  token",error.massege);
    }

}

function validateToken(){

}

module.exports = {createToken,validateToken};