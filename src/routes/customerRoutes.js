const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const auth = require("../middleware/auth");
const { isUser } = require("../middleware/rbac");

router.post("/", auth, isUser, customerController.createCustomer);
router.get("/", auth, customerController.getAllCustomers);

module.exports = router;
