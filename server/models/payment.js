const mongoose=require('mongoose')


const paymentSchema=new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId,ref:"user"},
    paymentId: String,
    amount: Number,
    currency: String,
    status: String,
})


const paymentModel=mongoose.model('payment',paymentSchema)
module.exports={
    paymentModel
}