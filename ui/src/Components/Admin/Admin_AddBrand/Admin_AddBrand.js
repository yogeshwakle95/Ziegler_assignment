import React, { useEffect, useState } from "react";
import Admin_nav from "../Admin_nav/Admin_nav";
import axios from "axios";

const Admin_AddBrand = () => {
  const [brandname, setBrandName] = useState("");
  const [getData, setGetData] = useState("");
  //  console.log(brandname);

  useEffect(() => {
    axios.get("http://localhost:8000/api/brands").then((res) => {
      setGetData(res.data);
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const lowerbrandname = brandname.toLowerCase();

    if (getData.some((datas) => datas.name.toLowerCase() === lowerbrandname)) {
      alert("Brand name already exists.");
    }
    
   else{
    // console.log(brandname);
    axios
      .post("http://localhost:8000/api/brands", {
        name: brandname,
      })
      .then((response) => {
        alert("successfully added");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  return (
    <div>
      <Admin_nav />
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form>
              <div className="form-group">
                <label htmlFor="name">Brand Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={brandname}
                  onChange={(e) => setBrandName(e.target.value)}
                  //   value={category}
                  //   onChange={handleChange}
                />
                {/* {errors.name && <small className="text-danger">{errors.name}</small>} */}
              </div>

              {/* {alertMessage && <div className="alert alert-danger">{alertMessage}</div>} */}

              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginTop: "10px", backgroundColor:"blue" }}
                onClick={handleSubmit}
              >
                Add Brand
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_AddBrand;
