import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CheckoutStripe from "./CheckoutStripe";
import CartContext from "../../contexts/cart-context";
import AuthContext from "../../contexts/auth-context";
import axios from "axios";

import {
  listOrder,
  cleanOrder,
  updateOrderState,
} from "../../redux/Order/OrderAction";

import { listUser, updateUser } from "../../redux/User/UserAction";

import { ConeStriped } from "react-bootstrap-icons";

const MINIMUM_PURCHASE = 5;
const MINIMUM_STRING_VALUE = 3;

function validateFields(type, value) {
  if (!value) value = "";
  let re = "";
  switch (type) {
    case "userId":
      return value.length > 0;
    case "name":
      return value.length > MINIMUM_STRING_VALUE;
    case "lastname":
      return value.length > MINIMUM_STRING_VALUE;
    case "email":
      re = /\S+@\S+\.\S+/;
      return re.test(value);
    case "phone":
      ///* Minum Value 8 */ re = /^[\+]?[(]?[0-9]{9}|[0-9]{10}$/im;
      /* Minimum Value 6 */
      re = /^[\+]?[(]?[0-9]{6}|[0-9]{10}$/im;
      return re.test(value);
    case "address":
      return value.length > MINIMUM_STRING_VALUE;
    case "city":
      return value.length > MINIMUM_STRING_VALUE;
    case "postcode":
      return value.length > MINIMUM_STRING_VALUE;
    case "country":
      return value.length > MINIMUM_STRING_VALUE;
    case "notes":
      return true;
    case "price":
      return value > MINIMUM_PURCHASE;
    case "orderitems":
      return value.length > 0;
    default:
      return false;
  }
}

function CheckoutArea() {
  const dispatch = useDispatch();
  dispatch(listUser(localStorage.getItem("userId")));
  const { order } = useSelector((state) => state.individualOrderReducer);
  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    checkObjectProperties(order);
    dispatch(updateOrderState("userId", user._id));
    dispatch(updateOrderState("name", user.name));
    dispatch(updateOrderState("lastname", user.lastname));
    dispatch(updateOrderState("email", user.email));
    dispatch(updateOrderState("phone", user.phone));
    dispatch(updateOrderState("address", user.address));
    dispatch(updateOrderState("city", user.city));
    dispatch(updateOrderState("country", user.country));
    dispatch(updateOrderState("postcode", user.postcode));
  }, [user]);

  const [message, setMessage] = useState("");
  const [isValid, setisValid] = useState(true);

  const context = useContext(CartContext);
  const authContext = useContext(AuthContext);

  context.cartItems.itemsPrice =
    context.cartItems &&
    context.cartItems.reduce((count, curItem) => {
      return count + parseInt(curItem.price) * parseInt(curItem.quantity || 0);
    }, 0);

  const checkObjectProperties = (obj) => {
    const objValues = Object.keys(obj);
    for (let i = 0; i < objValues.length; i++) {
      let key = objValues[i];
      let value = obj[key];
      const e = document.getElementById(`form-${key}`);
      if (!validateFields(key, value)) {
        if (e != null) e.classList.add("is-invalid");
        return false;
      } else {
        if (e != null) e.classList.remove("is-invalid");
        if (e != null) e.classList.add("is-valid");
      }
    }

    return true;
  };

  const submitOrder = (e) => {
    e.preventDefault();

    //Initialize Stripe

    if (!authContext.userId && !authContext.token) {
      setMessage("You need to login first");
      return;
    }

    console.log(order);

    /*     axios
      .post("/order/add-order-info", {
        userId: authContext.userId,
        order,
        orderItems: context.cartItems,
      })
      .then((res) => {
        if (res?.data?.message === "Order successfully added") {
          localStorage.removeItem("cart-items");
          dispatch(cleanOrder());
          setMessage(res.data.message);
        }
      })
      .catch((err) => console.log(err)); */
  };

  return (
    <section className="checkout-area ptb-50">
      <div className="container">
        {message !== "" && (
          <div
            className={`
        ${
          message === "Order successfully added"
        } ? alert alert-success : alert alert-danger 
      `}
            role="alert"
          >
            {message}
          </div>
        )}
        <form onSubmit={submitOrder}>
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="billing-details">
                <div className="row">
                  {/* name */}
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        First Name <span className="required">*</span>
                      </label>
                      <input
                        id="form-name"
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        value={order.name}
                        onChange={(e) =>
                          dispatch(updateOrderState("name", e.target.value))
                        }
                      />
                    </div>
                  </div>

                  {/* lastname */}
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        Last Name <span className="required">*</span>
                      </label>
                      <input
                        id="form-lastname"
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        value={order.lastname}
                        onChange={(e) =>
                          dispatch(updateOrderState("lastname", e.target.value))
                        }
                      />
                    </div>
                  </div>

                  {/* email */}
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        Email Address <span className="required">*</span>
                      </label>
                      <input
                        id="form-email"
                        type="email"
                        className="form-control"
                        placeholder="Email Address"
                        value={order.email}
                        onChange={(e) =>
                          dispatch(updateOrderState("email", e.target.value))
                        }
                      />
                    </div>
                  </div>

                  {/* phone */}
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        Phone <span className="required">*</span>
                      </label>
                      <input
                        id="form-phone"
                        type="text"
                        className="form-control"
                        placeholder="Phone"
                        value={order.phone}
                        onChange={(e) =>
                          dispatch(updateOrderState("phone", e.target.value))
                        }
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Address <span className="required">*</span>
                      </label>
                      <input
                        id="form-address"
                        type="text"
                        className="form-control"
                        placeholder="Address"
                        value={order.address}
                        onChange={(e) =>
                          dispatch(updateOrderState("address", e.target.value))
                        }
                      />
                    </div>
                  </div>

                  {/* Town */}
                  <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                      <label>
                        Town / City <span className="required">*</span>
                      </label>
                      <input
                        id="form-town"
                        type="text"
                        className="form-control"
                        placeholder="Town / City"
                        value={order.city}
                        onChange={(e) =>
                          dispatch(updateOrderState("city", e.target.value))
                        }
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                      <label>
                        Country <span className="required">*</span>
                      </label>

                      <input
                        id="form-country"
                        type="text"
                        className="form-control"
                        placeholder="Country"
                        value={order.country}
                        onChange={(e) =>
                          dispatch(updateOrderState("country", e.target.value))
                        }
                      />
                    </div>
                  </div>

                  {/* Postcode */}
                  <div className="col-lg-4 col-md-4">
                    <div className="form-group">
                      <label>
                        Postcode <span className="required">*</span>
                      </label>
                      <input
                        id="form-postcode"
                        type="text"
                        className="form-control"
                        placeholder="Postcode"
                        value={order.postcode}
                        onChange={(e) =>
                          dispatch(updateOrderState("postcode", e.target.value))
                        }
                      />
                    </div>
                  </div>

                  {/* notes */}
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Notes</label>
                      <textarea
                        value={order.notes}
                        onChange={(e) =>
                          dispatch(updateOrderState("notes", e.target.value))
                        }
                        name="notes"
                        id="form-notes"
                        cols="30"
                        rows="5"
                        placeholder="Order Notes"
                        className="form-control"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="order-details">
                <div className="cart-totals">
                  <h3>Cart Totals</h3>

                  <ul>
                    <li>
                      Subtotal{" "}
                      <span>
                        $
                        {context.cartItems &&
                          context.cartItems.reduce((count, curItem) => {
                            return (
                              count +
                              parseInt(curItem.price) *
                                parseInt(curItem.quantity || 0)
                            );
                          }, 0)}
                      </span>
                    </li>
                    <li>
                      Shipping <span>$30.00</span>
                    </li>
                    <li>
                      Total{" "}
                      <span>
                        $
                        {context.cartItems &&
                          context.cartItems.reduce((count, curItem) => {
                            return (
                              count +
                              parseInt(curItem.price) *
                                parseInt(curItem.quantity || 0)
                            );
                          }, 0) + 30}
                      </span>
                    </li>
                    <li>
                      Payable Total{" "}
                      <span>
                        $
                        {context.cartItems &&
                          context.cartItems.reduce((count, curItem) => {
                            return (
                              count +
                              parseInt(curItem.price) *
                                parseInt(curItem.quantity || 0)
                            );
                          }, 0) + 30}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="payment-box">
                  <h3 className="title">Payment Method</h3>
                  {checkObjectProperties(order) ? (
                    <CheckoutStripe />
                  ) : (
                    <div>
                      <p>Please fill out your details</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="user-actions mt-3">
          <i className="bx bx-log-in"></i>
          <span>
            Returning customer? <a href="#">Click here to login</a>
          </span>
        </div>
      </div>
    </section>
  );
}

export default CheckoutArea;
