const Order = require("../models/Order");
const Customer = require("../models/Customer");
const SKU = require("../models/SKU");
const { getNextOrderId } = require("../utils/helpers");
const { emitOrderNotification } = require("../services/websocket");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { customer_id, sku_id, quantity, rate } = req.body;

    const customer = await Customer.findOne({
      _id: customer_id,
      createdBy: req.user._id,
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const sku = await SKU.findOne({
      _id: sku_id,
      createdBy: req.user._id,
    });

    if (!sku) {
      return res.status(404).json({ message: "SKU not found" });
    }

    const subtotal = quantity * rate;
    const tax = subtotal * (sku.tax_rate / 100);
    const total_amount = subtotal + tax;

    const order_id = await getNextOrderId();

    const order = new Order({
      order_id,
      customer: customer._id,
      sku: sku._id,
      quantity,
      rate,
      tax_rate: sku.tax_rate,
      total_amount,
      createdBy: req.user._id,
    });

    await order.save();

    await order.populate("customer sku createdBy");

    const notificationData = {
      message: "New order placed",
      order_id: order.order_id,
      user: req.user.username,
      customer: customer.name,
      sku: sku.sku_name,
      total_amount: order.total_amount,
      timestamp: order.createdAt,
    };

    emitOrderNotification(notificationData);

    res.status(201).json({
      order_id: order.order_id,
      customer: customer.name,
      sku: sku.sku_name,
      total_amount: order.total_amount,
      timestamp: order.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    let query = {};

    if (req.user.role !== "admin") {
      query.createdBy = req.user._id;
    }

    const orders = await Order.find(query)
      .populate("customer", "name")
      .populate("sku", "sku_name unit_of_measurement tax_rate")
      .populate("createdBy", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
