const Order = require("../models/Order");

exports.getNextOrderId = async () => {
  try {
    const lastOrder = await Order.findOne().sort({ createdAt: -1 });

    let nextNumber = 1;

    if (lastOrder) {
      const lastOrderNumber = parseInt(lastOrder.order_id.split("-")[1]);
      nextNumber = lastOrderNumber + 1;
    }

    const nextOrderId = `OD-${nextNumber.toString().padStart(5, "0")}`;

    return nextOrderId;
  } catch (error) {
    console.error("Error generating order ID:", error);
    throw error;
  }
};
