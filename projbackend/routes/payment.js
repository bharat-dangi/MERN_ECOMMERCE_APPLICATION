const express = require("express")
const { isSignedIn, isAuthenticated } = require("../controllers/auth")
const { getToken, processPayment } = require("../controllers/payment")
const router=express.Router()


router.get("/payment/gettoken/:userId",isSignedIn,isAuthenticated,getToken)

router.post("/payment/braintree/:userId",isSignedIn,isAuthenticated,processPayment)


module.exports = router



