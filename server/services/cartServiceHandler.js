const { CartModel, cartItemModel } = require("../models/cart");
const { User } = require("../models/user");
const { decryptCart, encryptCart } = require("../middleware/cryptoUtils");
const { postData } = require("../models/posts");

const cartService = {
  getcarts: async (customerId) => {
    try {
      let findCart = await CartModel.findOne({ userID: customerId });
      if (!findCart) {
        return { error: "Cart not found" };
      }
      let user = await User.findById(customerId);
      let findCartItems = await cartItemModel.find({ cartId: findCart._id });

      if (!user) {
        return { error: "User not found" };
      }

      let decryptList = [];
      for (const item of findCartItems) {
        try {
          const decryptedItem = decryptCart(item.cart, user.vendorKey);

          let postItems = await postData.findById(decryptedItem.postId);

          if (postItems) {
            decryptedItem.post = postItems;
          } else {
            decryptedItem.post = null;
          }
          decryptList.push(decryptedItem);
        } catch (err) {
          return err;
        }
      }

      if (findCartItems !== null) {
        return { data: decryptList };
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

      let userFind = await User.findById(userID);

      if (!userFind) {
        return { error: "User not found" };
      }

      const cartAdded = await cartItemModel.create({
        cartId: cartItem._id,
        cart: encryptCart(dataToEncrypt, userFind.vendorKey),
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
  updateCart: async (cartData, userID) => {
    try {
      let cartItem = await CartModel.findOne({ userID: userID });

      if (!cartItem) {
        return { error: "cart not found" };
      }
      const { postId, quantity } = cartData;
      let cartItemExist = await cartItemModel.find({
        cartId: cartItem._id,
      });

      let userFind = await User.findById(userID);
      if (!userFind) {
        return { error: "User not found" };
      }
      let updatedResponse = [];
      for (const item of cartItemExist) {
        try {
          const decryptedItem = decryptCart(item.cart, userFind.vendorKey);
          if (decryptedItem.postId === postId) {
            decryptedItem.quantity = quantity;
            const encryptedItem = encryptCart(
              decryptedItem,
              userFind.vendorKey
            );
            item.cart = encryptedItem;
            await item.save();
          }
          updatedResponse.push(decryptedItem);
        } catch (err) {
          return err;
        }
      }
      return { data: updatedResponse };
    } catch (err) {
      return err;
    }
  },
};

module.exports = cartService;
