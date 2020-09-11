import React, { Fragment, useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./apiAdmin";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    category: [],
    quantity: "",
    shipping: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: ""
  });
  const {
    name,
    description,
    price,
    category,
    quantity,
    shipping,
    photo,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData
  } = values;

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, category: data, formData: new FormData() });
        console.log(values);
      }
    });
  };
  useEffect(() => {
    init();
  }, []);

  const { user, token } = isAuthenticated();
  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          category: [],
          quantity: "",
          shipping: "",
          photo: "",
          loading: false,
          createdProduct: data.name
        });
      }
    });

    //createProduct
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange("photo")}
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={handleChange("name")}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          className="form-control"
          value={description}
          onChange={handleChange("description")}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          type="number"
          className="form-control"
          value={price}
          onChange={handleChange("price")}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Category</label>
        <select className="form-control" onChange={handleChange("category")}>
          <option>Please Select</option>
          {/* {category &&
            category.map((cat, i) => (
              <option key={i} value={cat._id}>
                {cat.name}
              </option>
            ))} */}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          type="number"
          className="form-control"
          value={quantity}
          onChange={handleChange("quantity")}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select className="form-control" onChange={handleChange("shipping")}>
          <option>Please Select</option>

          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <button className="btn btn-outline-primary">Add</button>
    </form>
  );

  return (
    <Layout title="Add New Product" description={`Hello ${user.name}`}>
      <div className="row">
        <div className="col-md-8 offset-md-2">{newPostForm()}</div>
      </div>
    </Layout>
  );
};
export default AddProduct;
