const { getAllcarts, insertCart, updateCart } = require('../controller/CartController');
const { userAuthentication } = require('../middleware/auth');
 

 

const router =require('express').Router()

router.get("/",userAuthentication,getAllcarts)
router.post("/insert-cart",userAuthentication,insertCart)
router.put("/update-cart",userAuthentication,updateCart)

module.exports =router;






 