import React, { useEffect, useState } from "react";
import Admin_nav from "../Admin_nav/Admin_nav";
import axios from "axios";

const Addfeatured = () => {
  const [category, setCategory] = useState([]);
  const [image,setImage] = useState("")
  // const [formData,setFormData] = useState({
  //     category:"",
  //     featuredimage:""
  // });
  const [catId, setCatId] = useState("");

  const handleImageUpload = (uploadedFile) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      setImage( base64 );
    };
    reader.readAsDataURL(uploadedFile);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories/")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // console.log(catId);
  const handleSubmit = () => {
    // console.log(catId);
    axios.post("http://localhost:8000/api/featured",{
        category:catId,
        featuredimage:image
    }).then((res)=>{
        console.log(res);
    }).catch((error)=>{
        console.log(error);
    })
  };
  return (
    <div>
      <Admin_nav />
      <div style={{ width: "50%", margin: "20px 400px" }}>
        <div className="form-group">
          <label htmlFor="brand">Category:</label>
          <select
            name="brand"
            value={catId}
            onChange={(e) => setCatId(e.target.value)}
            //   onChange={handleChange}
            className="form-control"
          >
            <option value="">Select a Category</option>
            {category.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
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
    

        <button type="submit" className="btn btn-primary mt-2" onClick={handleSubmit} style={{backgroundColor:"blue"}}>
          Add Featured
        </button>
      </div>
    </div>
  );
};

export default Addfeatured;
