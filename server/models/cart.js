const { ref, number, date } = require('joi')
const mongoose=require('mongoose')



const CartSchema=new mongoose.Schema({
    id:{type:mongoose.Schema.Types.ObjectId},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
    cartId:{type:mongoose.Schema.Types.ObjectId,ref:"Cart"}
})

const cartItemsSchema=new mongoose.Schema({
    cartId:{type:mongoose.Types.ObjectId, ref:"Cart"},
    postId:{type:mongoose.Types.ObjectId,ref:"Post"},
    quantity:{type:number, default:null},
    createdAt:{type:date,default:Date.now()}
})

const CartModel=mongoose.model("cart",CartSchema)
const cartItemModel=mongoose.model("cartItems",cartItemsSchema)


module.exports={
    CartModel,cartItemModel
}