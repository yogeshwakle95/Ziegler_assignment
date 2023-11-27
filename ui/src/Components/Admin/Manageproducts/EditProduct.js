import React, { useEffect, useState } from "react";
import Admin_nav from "../Admin_nav/Admin_nav";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";

const EditProduct = () => {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [priceAfterDiscount, setPriceAfterDiscount] = useState("");
  const [image, setImage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products/${id}`)
      .then((res) => {
        const item = res.data;
        setTitle(item.title);
        setQuantity(item.quantity);
        setDescription(item.description);
        setPrice(item.price);
        setPriceAfterDiscount(item.priceAfterDiscount);
        setImage(item.image);
      })
      .catch((error) => {
        console.log("Error occurs: " + error);
      });
  }, []);

  const handleImageUpload = (uploadedFile) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      setImage(base64); // Update the image state with the new base64 data
    };
    reader.readAsDataURL(uploadedFile);
  };
  

  const handleSubmitUpdate = () => {
    const handleUpdate = {
      title: title,
      quantity: quantity,
      description: description,
      price: price,
      priceAfterDiscount: priceAfterDiscount,
      image: image,
    };
  
    axios
      .put(`http://localhost:8000/api/products/${id}`, handleUpdate)
      .then((res) => {
        console.log("Update data:", res.data); // Log the response data
        alert("Successfully updated");
      })
      .catch((error) => {
        console.log("Error occurs:", error);
        alert("Failed to update product. Please try again.");
      });
  };
  

//   const imaged = `data:image/png;base64,${image}`;

  return (
    <div>
      <Admin_nav />
      <button className="btn btn-primary" style={{ marginTop: "20px" }}>
        <Link
          to={"/admin/manageproducts"}
          style={{ textDecoration: "none", color: "white" }}
        >
          <IoIosArrowBack /> Back
        </Link>
      </button>
      <div className="container mt-3" style={{ width: "50%" }}>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              className="form-control"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              className="form-control"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Price After Discount</label>
            <input
              className="form-control"
              type="number"
              value={priceAfterDiscount}
              onChange={(e) => setPriceAfterDiscount(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Image</label>
            <br></br>
            {image && (
              <img
                key={image} // Add a unique key here
                src={`data:image/png;base64,${image}`}
                alt="Product"
                className="img-fluid"
                style={{width:'100px',height:'80px'}}
              />
            )}
            <input
              type="file"
              className="form-control"
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />
          </div>
          <button
            className="btn btn-primary"
            style={{ marginTop: "20px" }}
            onClick={handleSubmitUpdate}
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
