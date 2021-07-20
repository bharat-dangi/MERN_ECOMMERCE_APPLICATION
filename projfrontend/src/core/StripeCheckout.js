import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import StripeCheckout from "react-stripe-checkout";
import { API } from "../backend";

const StripesCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;
  const stripeKey = process.env.REACT_APP_StripeKey;

  const getFinalPrice = () => {
    let amount = 0;
    products?.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("RESPONSE:", response);
      })
      .catch((error) => console.log("ERROR:", error));
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckout
        stripeKey={stripeKey}
        token={makePayment}
        amount={getFinalPrice() * 100}
        name="Buy Products"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with Stripe</button>
      </StripeCheckout>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">SignIn</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Stripe Checkout {getFinalPrice()} </h3>
      {showStripeButton()}
    </div>
  );
};

export default StripesCheckout;
