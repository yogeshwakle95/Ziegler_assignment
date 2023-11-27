import React, { useState, useEffect } from "react";
import Admin_nav from "../Admin_nav/Admin_nav";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

const Manageproducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log("Error occurs while getting products: " + error);
      });
  }, []);

  const handleDelete = (productid) => {
    axios
      .delete(`http://localhost:8000/api/products/${productid}`)
      .then((res) => {
        console.log("Deleted successfully");
        // Remove the deleted product from the products state
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productid));
      })
      .catch((error) => {
        console.log("Error occurs while deleting: " + error);
      });
  };
  

  return (
    <div>
      <Admin_nav />
      <div>
        <h2>Product list</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Price After Discount</th>
              <th>Description</th>
              <th>Image</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.title}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{product.priceAfterDiscount}</td>
                <td>{product.description}</td>
                <td>
                  {product.image && (
                    <img
                      src={`data:image/png;base64,${product.image}`}
                      alt={product.name}
                      className="img-thumbnail"
                      style={{ width: "130px", height: "100px" }}
                    />
                  )}
                </td>
                <td>
                  <Link to={`/edit-product/${product._id}`}>
                    <FaEdit />
                  </Link>
                </td>
                <td>
                  <button onClick={()=>handleDelete(product._id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manageproducts;
