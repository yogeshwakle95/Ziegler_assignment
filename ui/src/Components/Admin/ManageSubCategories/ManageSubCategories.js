import React, { useEffect, useState } from 'react';
import Admin_nav from '../Admin_nav/Admin_nav';
import {FaEdit,FaTrash} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import axios from 'axios';
const ManageSubCategories = () => {
  const [subcategory,setSubcategory] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:8000/api/subcategories')
    .then((res)=>{
      setSubcategory(res.data);
    }).catch((error)=>{
      console.log("error occurs while getting subcategory: "+error);
    });
  });
 const handleDelete=(subCatId,e)=>{
      // console.log(subCatId);
      axios.delete(`http://localhost:8000/api/subcategories/${subCatId}`)
      .then(()=>{
          alert("Deleted Succefully");
          setSubcategory((prevCategories)=>prevCategories.filter((subcat)=>subcat._id !== subCatId));
      }).catch((error)=>{
        console.log(error);
      })
  }
  
  return (
    <div>
      <Admin_nav />
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>All subcategories</th>
              <th>Edit</th>
              <th>Delete</th> 
            </tr>
          </thead>
          <tbody>
            {subcategory.map((subcat,index)=>(
              <tr key={index}>
                <td>{subcat.name}</td>
                <td><Link to={`/edit-subcategory/${subcat._id}`}><FaEdit /></Link></td>
                <td>
                  <button onClick={()=>handleDelete(subcat._id)}><FaTrash /></button>
                  </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  )
}

export default ManageSubCategories
