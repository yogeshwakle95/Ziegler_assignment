import React, { useState, useEffect } from "react";
import Admin_nav from "../Admin_nav/Admin_nav";
import axios from "axios";

const AdminSubCat = () => {
  const [subcategoryName, setSubcategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [checkSubCat, setCheckSub] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    axios
      .get("http://localhost:8000/api/subcategories")
      .then((res) => {
        setCheckSub(res.data);
      })
      .catch((error) => {
        console.error("Error fetching subcategories:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!subcategoryName || !selectedCategory) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    const newSubcategorySlug = subcategoryName.toLowerCase();

    if (checkSubCat.some((subcat) => subcat.slug === newSubcategorySlug)) {
      alert("Subcategory already exists.");
    } else {
      axios
        .post("http://localhost:8000/api/subcategories", {
          name: subcategoryName,
          slug: newSubcategorySlug,
          category: selectedCategory,
        })
        .then((response) => {
          alert("Subcategory added successfully");
          console.log(response);
        })
        .catch((error) => {
          console.error("Error adding subcategory:", error);
          setErrorMessage("Failed to add subcategory. Please try again.");
        });
    }
  };

  return (
    <div>
      <Admin_nav />
      <div style={{ padding: "20px", margin: "20px", maxWidth: "400px" }}>
        <h2>Add Subcategory</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Subcategory Name:</label>
            <input
              type="text"
              className="form-control"
              value={subcategoryName}
              onChange={(e) => setSubcategoryName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Select Category:</label>
            <select
              className="form-control"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {/* {errorMessage && <p className="text-danger">{errorMessage}</p>} */}
          <button type="submit" className="btn btn-primary" style={{ marginTop: "20px", backgroundColor:"blue"}}>
            Add Subcategory
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSubCat;
