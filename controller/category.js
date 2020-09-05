const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandlers");

exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) return res.status(400).json({ err: errorHandler(err) });

    return res.status(200).json({ category });
  });
};

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "category not found"
      });
    }
    req.category = category;
    next();
  });
};

exports.read = (req, res) => {
  return res.json(req.category);
};

exports.list = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) return res.status(400).json({ err: errorHandler(err) });
    return res.status(200).json({ data });
  });
};

exports.update = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) return res.status(400).json({ err: errorHandler(err) });

    return res.status(200).json({ data });
  });
};

exports.remove = (req, res) => {
  const category = req.category;
  category.remove((err, data) => {
    if (err) return res.status(400).json({ err: errorHandler(err) });

    return res.status(200).json({ message: "category deleted successfully" });
  });
};
