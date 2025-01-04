
const { createPayment } = require('../controller/PaymentController');
const { userAuthentication } = require('../middleware/auth');
const validatePayment = require('../middleware/validatePayment');
 

 

const router =require('express').Router()

router.post('/payment-intent',validatePayment, createPayment);
 

module.exports =router;






 