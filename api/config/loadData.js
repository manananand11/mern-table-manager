const Menu = require("../models/menuModel");
const sampleData = require("./sampleData");

loadData = async () => {
  try {
    const menuCount = await Menu.countDocuments();
    if (menuCount === 0) {
      await Menu.insertMany(sampleData);
      console.log("Sample data loaded successfully");
    } else {
      console.log(
        "Data already exists in the Menu collection. Skipping data loading."
      );
    }
  } catch (error) {
    console.error("Error loading sample data:", error);
  }
};

module.exports = loadData;
