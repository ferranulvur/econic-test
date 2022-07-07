const Order = require("../models/Order");

exports.addOrderInfo = async (req, res) => {
  try {
    const { userId, order, totalPrice } = req.body;

    const Order = new Order({
      userId,
      user_first_name: order.firstName,
      user_last_name: order.lastName,
      user_email: order.email,
      user_phone: order.phone,
      user_country: order.country,
      user_address: order.address,
      user_city: order.city,
      user_postcode: order.postCode,
      user_order_notes: order.orderNotes,
      totalPrice: order.price,
      orderItems: order.orderItems,
    });
    await Order.save();
    res.status(200).json({
      message: "Order successfully added",
    });
  } catch (err) {
    res.status(500);
  }
};

exports.fetchOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id name");
    res.json(orders);
  } catch (err) {
    res.status(500);
  }
};

exports.updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
};

exports.getOrdersByUser = async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.id });
    if (!order) return res.status(404).json({ msg: "order not exist" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500);
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.find({ _id: req.params.id });
    if (!order) return res.status(404).json({ msg: "order not exist" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500);
  }
};
