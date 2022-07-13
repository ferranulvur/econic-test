import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import AuthContext from "../../contexts/auth-context";

import Swal from "sweetalert2";

import {
  updateUser,
  updateUserAction,
  listUser,
} from "../../redux/User/UserAction";

function UserArea() {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const { user } = useSelector((state) => state.userReducer);

  const authContext = useContext(AuthContext);

  const submitUser = async (e) => {
    e.preventDefault();
    console.log(user);
    Swal.fire({
      title: "Updating User",
      text: "Are you sure you want to update this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.value) {
        dispatch(
          updateUserAction(
            user._id,
            user.username,
            user.name,
            user.lastname,
            user.email,
            user.phone,
            user.address,
            user.city,
            user.country,
            user.postcode
          )
        );
        Swal.fire({
          title: "User Updated",
          text: "User has been updated successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="user-area-wrap ptb-100 container">
      <h4 className="user-header">User Profile</h4>

      <div className="user-info">
        {/* User update information form */}
        <form className="user-update-form" onSubmit={submitUser}>
          <div className="row">
            {/* username */}
            <div className="col-lg-6 col-md-6">
              <div className="form-group">
                <label>
                  Username <span className="required">*</span>
                </label>
                <input
                  id="form-username"
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={user.username}
                  onChange={(e) =>
                    dispatch(updateUser("username", e.target.value))
                  }
                />
              </div>
            </div>

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
                  value={user.name}
                  onChange={(e) => dispatch(updateUser("name", e.target.value))}
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
                  value={user.lastname}
                  onChange={(e) =>
                    dispatch(updateUser("lastname", e.target.value))
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
                  value={user.email}
                  onChange={(e) =>
                    dispatch(updateUser("email", e.target.value))
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
                  value={user.phone}
                  onChange={(e) =>
                    dispatch(updateUser("phone", e.target.value))
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
                  value={user.address}
                  onChange={(e) =>
                    dispatch(updateUser("address", e.target.value))
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
                  value={user.city}
                  onChange={(e) => dispatch(updateUser("city", e.target.value))}
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
                  value={user.country}
                  onChange={(e) =>
                    dispatch(updateUser("country", e.target.value))
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
                  value={user.postcode}
                  onChange={(e) =>
                    dispatch(updateUser("postcode", e.target.value))
                  }
                />
              </div>
            </div>
          </div>
          <div className="row">
            {/* submit */}
            <div className="col-lg-12 col-md-12">
              <div className="form-group">
                <button className="btn btn-primary" type="submit">
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </form>

        {user.role === "user" &&
          (user.orders.length <= 0 ? (
            <p>
              <span className="user-border">No orders </span>
            </p>
          ) : (
            user.orders.map((order) => {
              return <li key={order}>{order}</li>;
            })
          ))}
      </div>
    </div>
  );
}

export default UserArea;
