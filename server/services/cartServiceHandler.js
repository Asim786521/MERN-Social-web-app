const { find } = require("mongoose/lib/helpers/query/validOps");
const { CartModel, cartItemModel } = require("../models/cart");
const path = require("path");
const crypto=require("crypto-js");
const { User } = require("../models/user");

const cartService = {
  getcarts: async (customerId) => {
    try {
      let findCart;

      findCart = await CartModel.findOne({ userId: customerId });
      let findCartItems=await cartItemModel.findOne({cartId:findCart._id}).populate({path:"postId"})
      if (findCartItems !== null) {
        return { data: findCartItems };
      } else {
        return { data: [] };
      }
    } catch (err) {
      return {
        status: 500,
        error: err.message || "An unexpected error occurred",
      };
    }
  },

  insertCart: async (cartData, userID) => {
    try {
      let cartItem = await CartModel.findOne({ userID: userID });

      if (!cartItem) {
        cartItem = await CartModel.create({ userID: userID });
      }

      const { postId, quantity, Category } = cartData;

      // let cartItemExist = await cartItemModel.find({
      //   cartId: cartItem._id,
      //   postId: postId,
      // });

      // if (cartItemExist.length > 0) {
      //   return { error: "item already added" };
      // }
      const dataToEncrypt = {
         postId,
       quantity,
         Category,
      };
  

      let userFind=await User.findById(userID);

      if (!userFind) {
        return { error: "User not found" }; 
      }
      const encryptedData=await crypto.AES.encrypt(JSON.stringify(dataToEncrypt),userFind.vendorKey).toString()

      const cartAdded = await cartItemModel.create({
        cartId: cartItem._id,
        cart:encryptedData
      });

   
      console.log();
      
      if (cartAdded) {
        return { cartStatus: "added" };
      } else {
        return { cartStatus: "failed" };
      }
    } catch (err) {
      return err;
    }
  },
};

module.exports = cartService;
