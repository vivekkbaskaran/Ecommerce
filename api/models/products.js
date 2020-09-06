const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    description: {
      type: String,
      required: true,
      maxlength: 200
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Categroy",
      required: true
    },
    quantity: {
      type: Number
    },
    sold: {
      type: Number,
      default: 0
    },
    photo: {
      contentType: String,
      data: Buffer
    },
    shipping: {
      required: false,
      type: Boolean
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
