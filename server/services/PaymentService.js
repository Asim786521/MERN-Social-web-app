const stripe=require('../config/stripe')

exports.createPayment=async(amount,currency)=>{
    return await stripe.paymentIntents.create({
        amount,
        currency
    })
}