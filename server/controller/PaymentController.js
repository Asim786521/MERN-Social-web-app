const PaymentService=require('../services/PaymentService')


const createPayment=async(req,res)=>{
    try{
        const customerId = req.user.userId;
        const{amount,currency}=req.body;
        const paymentIntent=await PaymentService.createPayment(amount,currency,customerId)
        res.status(200).json(paymentIntent)

    }catch(err){
     res.status(500).json({ err: err.message });
    }
}

module.exports={
    createPayment
}