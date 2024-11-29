const { getAllcarts, insertCart } = require('../controller/CartController');
const { userAuthentication } = require('../middleware/auth');
 

 

const router =require('express').Router()

router.get("/",userAuthentication,getAllcarts)
router.post("/insert-cart",userAuthentication,insertCart)

module.exports =router;






 