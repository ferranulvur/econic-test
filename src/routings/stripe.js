const express = require("express");
const router = express.Router();

const stripeController = require("../controllers/stripe");

router.post("/checkout", stripeController.checkOut);
/* router.post("/checkout", async function (req, res) {
  try {
    const { order, addresses, token } = req.body;
    const result = await stripeController.checkOut(order, addresses, token);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
}); */

module.exports = router;
