const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  lastname: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  postcode: {
    type: String,
    required: false,
  },
  newpassword: {
    type: String,
  },
  profile_picture: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  email_confirmation: {
    type: String,
    required: false,
  },
  reset_password_token: {
    type: String,
    required: false,
  },
  reset_password_expiration: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
