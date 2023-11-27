import React, { useEffect, useState } from "react";
import Admin_nav from "../Admin_nav/Admin_nav";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories/")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.log("Error occurs while getting categories: " + error);
      });
  });

  const handleDelete=(categoryId)=>{
    // console.log(categoryId);
    axios.delete(`http://localhost:8000/api/categories/${categoryId}`)
    .then(()=>{
      alert("Deleted succefully");
      setCategories((prevCategories) =>prevCategories.filter((cat) => cat._id !== categoryId));
    }).catch((error)=>{
      console.log("Error occurs while deleting categories: "+error);
    })
  }

  return (
    <div>
      <Admin_nav />
      <div className="container d-flex justify-content-center mt-4">  
        <table className="table">
          <thead>
            <tr>
              <th>All categories</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td>{category.name}</td>
                <td>
                 <Link to={`/edit-categories/${category._id}`}><FaEdit /></Link> 
                </td>
                <td>
                 <button onClick={()=>handleDelete(category._id)}><FaTrash /></button> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCategories;
