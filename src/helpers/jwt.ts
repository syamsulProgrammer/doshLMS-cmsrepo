// var jwt = require('jsonwebtoken');
// import jwt from "jsonwebtoken"

import * as jose from 'jose'

// require('dotenv').config()
const secretWord = "6c93f1e7831fc0f38ea40fc228898ade8245e2befccca6113688edb618dfa219"
const secret = new TextEncoder().encode(
    secretWord
  );
var jwt = require('jsonwebtoken');
// console.log(process.env)
const jwtHelpers = {
    generateToken: async (userId:any, role:string)=>{
        var token = jwt.sign({ username: userId, role: role }, secret);
        // const token = new jose.SignJWT({
        //     userId: userId,
        //     iat: Math.floor(Date.now() / 1000)
        // }, secretWord, { expiresIn: '6h' })
        // return token
        // console.log(token)
        return token
    },
    parseToken: async (token:any)=>{
        // jwt.verify
        // const parsed = await jose.jwtVerify(token, secret)
        // const parsed = jwt.verify(token, "w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G-K".toString("utf-8"))
        return token
    }
}

export default jwtHelpers