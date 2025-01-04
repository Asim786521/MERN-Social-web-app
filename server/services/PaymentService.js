const stripe=require('../config/stripe')
const { User } = require('../models/user')

exports.createPayment=async(amount,currency,customerId)=>{

    let verifyUser=User.findById(customerId)
    if(!verifyUser){
        return {error:"user not found"}
    }
    return await stripe.paymentIntents.create({
        amount,
        currency
    })
}