import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Admin_nav from "../Admin_nav/Admin_nav";
import { IoIosArrowBack } from "react-icons/io";

const EditCategoris = () => {
  const { id } = useParams();
  // console.log(id);
  const [categories,setCategories] = useState('');
  const [image,setImage] = useState("");
  
  useEffect(()=>{
    axios.get(`http://localhost:8000/api/categories/${id}`)
    .then((res)=>{
      const item = res.data;
      setCategories(item.name);
      setImage(item.catImage);
    }).catch((error)=>{
      console.log(error);
    })
  },[])

  const handleImageUpload = (uploadedFile) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      setImage(base64); // Update the image state with the new base64 data
    };
    reader.readAsDataURL(uploadedFile);
  };


  // console.log(categories);
  const handleCategoriesUpdate=(e)=>{
    e.preventDefault();
    const handleUpdate ={
      name:categories,
      catImage:image
    }
       axios.put(`http://localhost:8000/api/categories/${id}`,handleUpdate)
       .then((res)=>{
              // console.log("updated Succefully");
              alert("updated Succefully");
       }).catch((error)=>{
        console.log(error);
       })
  }
  return (
    <div>
      <Admin_nav />
      <div>
        <button className="btn btn-primary" style={{ marginTop: "10px" }}>
          <Link
            to={"/admin/manageCategories"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <IoIosArrowBack />
            Back
          </Link>
        </button>
        <div className="container mt-3" style={{ width: "50%" }}>
          <form>
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
            <div className="form-group">
          <label>Category Name</label><br></br>
          <input value={categories} className="form-control" onChange={(e)=>setCategories(e.target.value)} /><br></br>
          </div>
          <button className="btn btn-primary"
            style={{ marginTop: "10px" }} onClick={handleCategoriesUpdate}>Update Category</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCategoris;
