const mongoose = require("mongoose");

const categroySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categroy", categroySchema);
