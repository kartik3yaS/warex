const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../middleware/auth");
const { isUser } = require("../middleware/rbac");

router.post("/", auth, isUser, orderController.createOrder);
router.get("/", auth, orderController.getAllOrders);

module.exports = router;
