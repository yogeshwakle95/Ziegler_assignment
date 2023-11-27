import React, { useState, useEffect } from "react";
import axios from "axios";
import Admin_nav from "../Admin_nav/Admin_nav";

const Addproducts = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    price: "",
    priceAfterDiscount: "",
    category: "",
    // subcategories: [],
    subcategories: "",
    brand: "",
    image: "",
  });

  const handleImageUpload = (uploadedFile) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      setFormData({
        ...formData,
        image: base64,
      });
    };
    reader.readAsDataURL(uploadedFile);
  };

  useEffect(() => {
    // Fetch categories
    axios
      .get("http://localhost:8000/api/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    // Fetch brands
    axios
      .get("http://localhost:8000/api/brands")
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
      });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setFormData({
      ...formData,
      category: categoryId,
      subcategories: "", // Clear the selected subcategory when category changes
    });

    // Fetch subcategories based on the selected category
    axios
      .get(`http://localhost:8000/api/categories/${categoryId}/subcategories`)
      .then((response) => {
        setSubcategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching subcategories:", error);
      });
  };

  // Handle subcategory change
  const handleSubcategoryChange = (e) => {
    const subcategoryId = e.target.value;
    setFormData({ ...formData, subcategories: [subcategoryId] });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Make a POST request with formData to http://localhost:8000/api/products
    axios
      .post("http://localhost:8000/api/products", formData)
      .then((response) => {
        alert("Added Succefully");
        console.log("Product added successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  return (
    <div>
      <Admin_nav />
      <div style={{ width: "50%", margin: "20px 400px" }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="brand">Brand:</label>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select a Brand</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              className="form-control"
            >
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="subcategory">Subcategory:</label>
            <select
              name="subcategory"
              value={formData.subcategories[0]}
              onChange={handleSubcategoryChange}
              className="form-control"
            >
              <option value="">Select a Subcategory</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="priceAfterDiscount">Price After Discount:</label>
            <input
              type="number"
              name="priceAfterDiscount"
              value={formData.priceAfterDiscount}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              name="image"  
              onChange={(e) => handleImageUpload(e.target.files[0])}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2" style={{backgroundColor:"blue"}}>
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproducts;
