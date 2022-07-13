import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { listUser } from "../../redux/User/UserAction";

import PageTitle from "../../components/Common/PageTitle";
import Footer from "../../components/Footer/Footer";
import CheckoutArea from "../../components/Shop/CheckoutArea";

function Checkout() {
  const dispatch = useDispatch();
  dispatch(listUser(localStorage.getItem("userId")));
  const { user } = useSelector((state) => state.userReducer);
  useEffect(() => {}, [user]);

  return (
    <div className="checkout-wrapper">
      <PageTitle title="Checkout" />
      <CheckoutArea />
      <Footer />
    </div>
  );
}

export default Checkout;
