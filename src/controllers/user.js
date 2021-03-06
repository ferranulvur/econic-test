const bcrypt = require("bcryptjs");

const User = require("../models/User");
const genAccTkn = require("../helpers/genAccessToken");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../utils/validators");

exports.postLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const { errors, valid } = validateLoginInput(email, password);

    if (!valid) {
      return res.status(200).json({
        errors,
      });
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(200).json({
        error: "Email or password isn't matched",
      });
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      return res.status(200).json({
        error: "Email or password isn't matched",
      });
    }

    const token = genAccTkn.generateAccessToken(user);

    if (!token) {
      return res.status(200).json({
        error: "Token not generated",
      });
    }

    return res.status(200).json({
      id: user.id,
      token,
      tokenExpiration: "24h",
      user: user,
    });
  } catch (err) {
    res.status(500);
  }
};

exports.postRegister = async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const { valid, errors } = validateRegisterInput(username, email, password);

    if (!valid) {
      return res.status(401).json({
        errors,
      });
    }

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(401).json({
        error: "Sorry email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      username,
      email,
      role: "user",
      password: hashedPassword,
      orders: [],
    });

    const newUser = await user.save();

    res.status(200).json({
      message: "User created",
      newUser,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.userDetails = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById({
      _id,
    });
    return res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500);
  }
};

exports.editUser = async (req, res) => {
  try {
    const _id = req.body.id;
    const username = req.body.username;
    const email = req.body.email;
    const name = req.body.name;
    const lastname = req.body.lastname;
    const phone = req.body.phone;
    const address = req.body.address;
    const city = req.body.city;
    const country = req.body.country;
    const postcode = req.body.postcode;

    const userUpdated = await User.updateOne(
      { _id: _id },
      {
        $set: {
          username: username,
          email: email,
          name: name,
          lastname: lastname,
          phone: phone,
          address: address,
          city: city,
          country: country,
          postcode: postcode,
        },
      }
    );
    return res
      .status(200)
      .json({ message: `User ${req.body.name} updated`, userUpdated });
  } catch (err) {
    res.status(500);
  }
};

exports.checkRole = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById({ _id: userId });

    if (user.role === "user") {
      res.status(200).json({
        role: "user",
      });
    } else {
      res.status(200).json({
        role: "admin",
      });
    }
  } catch (err) {
    res.status(500);
  }
};

exports.passwordReset = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const newpassword = req.body.newpassword;

    //check user email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: "Email isn't matched",
      });
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      return res.status(401).json({
        error: "Email or password isn't matched",
      });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 12);

    user.password = hashedPassword;
    const updateUserPassword = await user.save();
    const token = genAccTkn.generateAccessToken(user);
    return res.status(200).json({
      id: user.id,
      token,
      tokenExpiration: "24h",
      message: "Password has been updated",
    });
  } catch (err) {
    res.status(500);
  }
};
