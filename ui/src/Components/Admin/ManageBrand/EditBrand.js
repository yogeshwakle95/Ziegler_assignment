import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useParams,Link} from 'react-router-dom';
import Admin_nav from '../Admin_nav/Admin_nav';
import {IoIosArrowBack} from 'react-icons/io'

const EditBrand = () => {
    const [Brand,setBrand] = useState('')
    const {id} = useParams();
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/brands/${id}`)
        .then((res)=>{
            // console.log(res.data);
            const item = res.data;
            setBrand(item.name);
        })
    },[])

    const handleUpdateBrand=(e)=>{
        e.preventDefault();
        const handleupdate={
            name:Brand
        }
        axios.put(`http://localhost:8000/api/brands/${id}`,handleupdate)
        .then(()=>{
            alert("succefully updated")
        }).catch((error)=>{
            console.log(error);
        })
    }
    // console.log(Brand);
    // console.log(id);
  return (
    <div>
        <Admin_nav />
        <div>
        <button className="btn btn-primary" style={{ marginTop: "10px" }}>
          <Link
            to={"/admin/managebrand"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <IoIosArrowBack />
            Back
          </Link>
        </button>
        <div className="container mt-3" style={{ width: "50%" }}>
            <form>
                <div className="form-group">
                <label>Brand Name</label>
                <input value={Brand} className="form-control" onChange={(e)=>setBrand(e.target.value)}/>
                </div>
                <button className="btn btn-primary"
            style={{ marginTop: "10px" }} onClick={handleUpdateBrand}>Update Brand</button>
            </form>
        </div>
        
        </div>
    </div>
  )
}

export default EditBrand
