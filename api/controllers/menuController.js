const Menu = require("../models/menuModel");

exports.getMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
