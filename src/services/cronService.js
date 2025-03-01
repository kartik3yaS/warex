const cron = require("node-cron");
const Order = require("../models/Order");

const initCronJobs = (io) => {
  cron.schedule("0 * * * *", async () => {
    try {
      const now = new Date();
      const oneHourAgo = new Date(now - 60 * 60 * 1000);

      const orders = await Order.find({
        createdAt: { $gte: oneHourAgo, $lte: now },
      });

      const total_amount = orders.reduce(
        (sum, order) => sum + order.total_amount,
        0
      );

      const summary = {
        total_orders: orders.length,
        total_amount,
        timestamp: now,
      };

      if (io) {
        io.to("admin-room").emit("hourly-summary", summary);
      }

      console.log("Hourly summary sent:", summary);
    } catch (error) {
      console.error("Error generating hourly summary:", error);
    }
  });

  console.log("Cron jobs initialized");
};

module.exports = { initCronJobs };
