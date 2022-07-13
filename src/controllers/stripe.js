const stripe = require("stripe")(process.env.STRIPE_KEY);
const uuid = require("uuid").v4;

const Order = require("../models/Order");
const { ObjectId } = require("mongodb");

exports.checkOut = async (req, res) => {
  try {
    const findbyId = async (id) => {};
    const idempotencyKey = uuid();

    const order = req.body.order;
    const addresses = req.body.addresses;
    const token = req.body.token;
    const { email, id } = token;

    /* Stripe Customer Create */
    const customer = await stripe.customers.create({
      email,
      source: id,
    });

    /* New Order Create */
    const newOrderObj = new Order({
      userId: order.userId,
      user_first_name: order.name,
      user_last_name: order.lastname,
      user_email: order.email,
      user_phone: order.phone,
      user_country: order.country,
      user_address: order.address,
      user_city: order.city,
      user_postcode: order.postcode,
      user_order_notes: order.notes,
      totalPrice: order.price,
      orderItems: order.orderitems,
      isDelivered: false,
      stripeCustomerId: customer.id,
    });

    const newOrder = await newOrderObj
      .save()
      .then((newOrder) => {
        return newOrder;
      })
      .catch((err) => {
        /* return error */
        res.status(500).json({
          message: "Error creating order",
          error: err,
        });
      });

    /* ChargeInfo Object */
    const chargeInfo = {
      amount: order.price * 100,
      currency: "eur",
      customer: customer.id,
      receipt_email: token.email,
      description: `Commerce order ${newOrder}`,
      shipping: {
        name: token.card.name,
        address: {
          line1: token.card.address_line1,
          line2: token.card.address_line2,
          city: token.card.address_city,
          country: token.card.address_country,
          postal_code: token.card.address_zip,
        },
      },
    };

    /* Stripe Charge Create */
    const stripeCharge = await stripe.charges
      .create(chargeInfo, { idempotencyKey })
      .then((charge) => {
        return charge;
      })
      .catch((err) => {
        /* return error */
        res.status(500).json({
          message: "Error creating charge",
          error: err,
        });
      });

    /* Update Order stripeid field */
    const updatedOrder = await Order.updateOne(
      { _id: newOrder._id },
      {
        $set: {
          stripeId: stripeCharge.id,
          isPaid: true,
        },
      },
      { new: true }
    )
      .then((updatedOrder) => {
        return updatedOrder;
      })
      .catch((err) => {
        /* return error */
        res.status(500).json({
          message: "Error updating order",
          error: err,
        });
      });

    /* Log order by id */
    const foundOrder = await Order.findById({ _id: newOrder._id })
      .then((order) => {
        return order;
      })
      .catch((err) => {
        /* return error */
        res.status(500).json({
          message: "Error finding order",
          error: err,
        });
      });
    res.status(200).json(foundOrder);
  } catch (err) {
    res.status(500).json({
      message: "Error checking out",
      error: err,
    });
  }
};
