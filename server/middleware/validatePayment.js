module.exports=(req,res,next)=>{
    const{amount,currency}=req.body;
    if(!amount ||!currency){
        return res.status(400).json({error: "Amount and currency are required"})
        }
}