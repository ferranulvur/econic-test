import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import "./CheckoutStripe.css";

const STRIPE_KEY = process.env.REACT_APP_STRIPE_KEY;
const STRIPE_PUBLISHABLE = process.env.REACT_APP_STRIPE;
const PAYMENT_SERVER_URL = "http://localhost:5000/";

const CURRENCY = "EUR";

const fromEuroToCent = (amount) => amount * 100;

const successPayment = (data) => {
  alert("Payment Successful");
};

const errorPayment = (data) => {
  alert("Payment Error");
};

function CheckoutStripe() {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.individualOrderReducer);

  const onToken = async (token, addresses) => {
    let formData = new FormData();
    formData.append("token", JSON.stringify(token));
    formData.append("order", JSON.stringify(order));
    formData.append("addresses", JSON.stringify(addresses));
    const { data, status } = await axios.post("stripe/checkout", {
      token,
      addresses,
      order,
    });

    console.log(order);
    console.log(data, status);
  };

  console.log(order);
  return (
    <StripeCheckout
      billingAddress
      name={order.name}
      email={order.email}
      description={"description"}
      amount={fromEuroToCent(order.amount)}
      token={onToken}
      currency={CURRENCY}
      stripeKey={STRIPE_PUBLISHABLE}
    />
  );
}

export default CheckoutStripe;
