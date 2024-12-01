const cartService = require("../services/cartServiceHandler");

const getAllcarts = async (req, res) => {
  try {
    const customerId = req.user.userId;

    const response = await cartService.getcarts(customerId);

    return res.status(200).json(response);
  } catch (err) {
    return err;
  }
};

const insertCart = async (req, res) => {
  try {
    const response = await cartService.insertCart(req.body, req.user.userId);
    if (response.error) {
      return res.status(400).json(response);
    }
    return res.status(200).json(response);
  } catch (err) {
    return err;
  }
};

const updateCart = async (req, res) => {
  try {
    const response = await cartService.updateCart(req.body, req.user.userId);
    if (response.error) {
      return res.status(400).json(response);
    }
    return res.status(200).json(response);
  } catch (err) {
    return err;
  }
};
module.exports = {
  getAllcarts,
  insertCart,
  updateCart,
};
