const SKU = require("../models/SKU");

// Create a new SKU
exports.createSKU = async (req, res) => {
  try {
    const { sku_name, unit_of_measurement, tax_rate } = req.body;

    const sku = new SKU({
      sku_name,
      unit_of_measurement,
      tax_rate,
      createdBy: req.user._id,
    });

    await sku.save();

    res.status(201).json(sku);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all SKUs for the logged-in salesman
exports.getAllSKUs = async (req, res) => {
  try {
    let query = {};

    if (req.user.role !== "admin") {
      query.createdBy = req.user._id;
    }

    const skus = await SKU.find(query);

    res.status(200).json(skus);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
