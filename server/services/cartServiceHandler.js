const { find } = require("mongoose/lib/helpers/query/validOps");
const { CartModel, cartItemModel } = require("../models/cart");
const { response } = require("express");

const cartService = {
  getcarts: async (customerId) => {
    try {
      let findCart;

      findCart = await CartModel.findOne({ userId: customerId });
      if (findCart !== null) {
        return { data: findCart };
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

      let cartItemExist = await cartItemModel.find({
        cartId: cartItem._id,
        postId: postId,
      });

      if (cartItemExist.length > 0) {
        return { error: "item already added" };
      }
      const cartAdded = await cartItemModel.create({
        cartId: cartItem._id,
        postId: postId,
        quantity: quantity,
        category: Category,
      });

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
