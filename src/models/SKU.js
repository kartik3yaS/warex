const mongoose = require("mongoose");

const skuSchema = new mongoose.Schema({
  sku_name: {
    type: String,
    required: true,
    trim: true,
  },
  unit_of_measurement: {
    type: String,
    required: true,
    trim: true,
  },
  tax_rate: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SKU = mongoose.model("SKU", skuSchema);
module.exports = SKU;
