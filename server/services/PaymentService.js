const stripe=require('../config/stripe')

exports.createPayment=async(amount,cuurency)=>{
    return await stripe.paymentIntent.create({
        amount,
        cuurency
    })
}