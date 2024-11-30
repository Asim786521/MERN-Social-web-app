 
const mongoose=require('mongoose')



const CartSchema=new mongoose.Schema({
    userID:{type:mongoose.Types.ObjectId, ref:"user"},
   
})

const cartItemsSchema=new mongoose.Schema({
    cartId:{type:mongoose.Types.ObjectId,ref:"cart"},
    cart:{type:String,default:null},
    // postId:{type:mongoose.Types.ObjectId,ref:"posts"},
    // quantity:{type:Number, default:1},
    // category:{type:String,default:''},
    createdAt:{type:Date,default:Date.now()}
})

const CartModel=mongoose.model("cart",CartSchema)
const cartItemModel=mongoose.model("cartItems",cartItemsSchema)


module.exports={
    CartModel,cartItemModel
}