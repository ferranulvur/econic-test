import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CartContext from "../../contexts/cart-context";
import AuthContext from "../../contexts/auth-context";
import axios from "axios";

import {
  listOrder,
  cleanOrder,
  updateOrderState,
} from "../../redux/Order/OrderAction";

function CheckoutArea() {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.individualOrderReducer);
  useEffect(() => {}, [order]);

  const [message, setMessage] = useState("");

  const context = useContext(CartContext);
  const authContext = useContext(AuthContext);

  context.cartItems.itemsPrice =
    context.cartItems &&
    context.cartItems.reduce((count, curItem) => {
      return count + parseInt(curItem.price) * parseInt(curItem.quantity || 0);
    }, 0);

  const submitOrder = (e) => {
    e.preventDefault();

    console.log(context.cartItems);
    dispatch(updateOrderState("price", context.cartItems.itemsPrice));

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
              <div className="user-actions">
                <i className="bx bx-log-in"></i>
                <span>
                  Returning customer? <a href="#">Click here to login</a>
                </span>
              </div>

              <div className="user-actions-2">
                <i className="bx bx-code-alt"></i>
                <span>
                  Have a coupon? <a href="#">Click here to enter your code</a>
                </span>
              </div>

              <div className="billing-details">
                <h3 className="title">Billing Details</h3>

                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        First Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        value={order.firstName}
                        onChange={(e) =>
                          dispatch(updateOrderState("name", e.target.value))
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        Last Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        value={order.lastName}
                        onChange={(e) =>
                          dispatch(updateOrderState("lastname", e.target.value))
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Email Address <span className="required">*</span>
                      </label>
                      <input
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

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Phone <span className="required">*</span>
                      </label>
                      <input
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

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Country <span className="required">*</span>
                      </label>

                      <input
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

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Address <span className="required">*</span>
                      </label>
                      <input
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

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Town / City <span className="required">*</span>
                      </label>
                      <input
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

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Postcode <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Postcode"
                        value={order.postCode}
                        onChange={(e) =>
                          dispatch(updateOrderState("postCode", e.target.value))
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="create-an-account"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="create-an-account"
                      >
                        Create an account?
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="ship-different-address"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="ship-different-address"
                      >
                        Ship to a different address?
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <textarea
                        value={order.orderNotes}
                        onChange={(e) =>
                          dispatch(updateOrderState("notes", e.target.value))
                        }
                        name="notes"
                        id="notes"
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
                  <button
                    type="submit"
                    className="default-btn"
                    style={{ cursor: "pointer" }}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CheckoutArea;
