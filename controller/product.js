const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/products");
const { errorHandler } = require("../helpers/dbErrorHandlers");

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(400).json({ err: "Image coud not be uploaded" });
    const { name, description, price, quantity, category, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !quantity ||
      !category ||
      !shipping
    ) {
      return res.status(400).json({ err: "All fields are required" });
    }
    let product = new Product(fields);
    if (files.photo) {
      if (files.photo.size > 500000) {
        res.status(400).json({ err: "Image should be less than 5 mb" });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, product) => {
      if (err) return res.status(400).json({ err: errorHandler(err) });
      return res.status(200).json({ product });
    });
  });
};

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "product not found"
      });
    }
    req.product = product;
    next();
  });
};

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.remove = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({ message: "Product deleted successfully" });
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(400).json({ err: "Image coud not be uploaded" });
    const { name, description, price, quantity, category, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !quantity ||
      !category ||
      !shipping
    ) {
      return res.status(400).json({ err: "All fields are required" });
    }
    let product = req.product;
    product = _.extend(product, fields);
    if (files.photo) {
      if (files.photo.size > 500000) {
        res.status(400).json({ err: "Image should be less than 5 mb" });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, product) => {
      if (err) return res.status(400).json({ err: errorHandler(err) });
      return res.status(200).json({ product });
    });
  });
};

/***
 * sell /products?sortBy=sold&order=desc&limit=4
 * sell /products?createdAt=sold&order=desc&limit=4
 * if no params return all products
 ***/
exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? req.query.limit : 6;

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      res.send(products);
    });
};
