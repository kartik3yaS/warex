const express = require("express");
const router = express.Router();
const skuController = require("../controllers/skuController");
const auth = require("../middleware/auth");
const { isUser } = require("../middleware/rbac");

router.post("/", auth, isUser, skuController.createSKU);
router.get("/", auth, skuController.getAllSKUs);

module.exports = router;
