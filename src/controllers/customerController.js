const Customer = require("../models/Customer");

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const { name, address } = req.body;

    const customer = new Customer({
      name,
      address,
      createdBy: req.user._id,
    });

    await customer.save();

    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all customers for the logged-in salesman
exports.getAllCustomers = async (req, res) => {
  try {
    let query = {};

    if (req.user.role !== "admin") {
      query.createdBy = req.user._id;
    }

    const customers = await Customer.find(query);

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
