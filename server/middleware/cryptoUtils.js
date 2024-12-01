const crypto = require("crypto-js");

const encryptCart = (Data,vendorID) => {
  const encryptedData = crypto.AES.encrypt(
    JSON.stringify(Data),
    vendorID
  ).toString();

  return encryptedData;
};
const decryptCart = (cart, vendorID) => {
  const decryptedData = crypto.AES.decrypt(cart, vendorID).toString(
    crypto.enc.Utf8
  );
  return JSON.parse(decryptedData);
};

module.exports = {
  encryptCart,
  decryptCart,
};
