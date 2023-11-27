import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Admin_nav from "../Admin_nav/Admin_nav";

const EditSubCategories = () => {
  const [subcategories, setSubcategory] = useState([]);

  const { id } = useParams();
  // console.log(id);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/subcategories/${id}`)
      .then((res) => {
        const item = res.data;
        setSubcategory(item.name);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log("Error subcategory: " + error);
      });
  }, []);

  const handleSubCategoriesUpdate = (e) => {
    e.preventDefault();
    const handleUpdate =  {
      name: subcategories
    }
    axios.put(`http://localhost:8000/api/subcategories/${id}`,handleUpdate)
    .then(()=>{
        alert("Succefully updated");
    }).catch((error)=>{
        console.log(error);
    })
  };
  //   console.log(subcategories);

  return (
    <div>
      <Admin_nav />
      <div>
        <button className="btn btn-primary" style={{ marginTop: "10px" }}>
          <Link
            to={"/admin/manageSubCategories"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <IoIosArrowBack />
            Back
          </Link>
        </button>
        <div className="container mt-3" style={{ width: "50%" }}>
          <form>
            <div className="form-group">
              <label>subcategory Name</label>
              <input
                value={subcategories}
                className="form-control"
                onChange={(e) => setSubcategory(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" style={{ marginTop: "10px" }} onClick={handleSubCategoriesUpdate}>
              Update SubCategory
            </button>
          </form>
        </div>
      </div>
      {/* <h1>Edit subcategories</h1> */}
    </div>
  );
};

export default EditSubCategories;
