import React, { useEffect, useState } from "react";
import Admin_nav from "../Admin_nav/Admin_nav";
import { FaArrowAltCircleDown, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const ManageBrand = () => {
  const [Brand, setBrand] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/brands").then((res) => {
      // console.log(res.data);
      setBrand(res.data);
    });
  }, []);

  const handleDelete = (brandID) => {
    // console.log(brandID);
    axios
      .delete(`http://localhost:8000/api/brands/${brandID}`)
      .then(() => {
        alert("Succefully deleted");
        setBrand((preveBrand)=>preveBrand.filter((brands)=>brands._id !== brandID));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Admin_nav />
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>All Brands</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Brand.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>
                  <Link to={`/edit-brand/${data._id}`}>
                    <FaEdit />
                  </Link>
                </td>
                <td>
                  <button onClick={() => handleDelete(data._id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <h1>Manage Brand</h1> */}
      </div>
    </div>
  );
};

export default ManageBrand;
