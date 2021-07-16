const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { signOut, signUp, signIn, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("Name should be at least 3 characters"),
    check("email").isEmail().withMessage("Enter email"),
    check("password")
      .isLength({
        min: 5,
      })
      .withMessage("Password should be at least 5 characters"),
  ],
  signUp
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Enter email"),
    check("password")
      .isLength({
        min: 5,
      })
      .withMessage("Password field is required"),
  ],
  signIn
);

router.get("/signout", signOut);



module.exports = router;
