import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {FaEdit,FaTrash} from 'react-icons/fa';
import Admin_nav from '../Admin_nav/Admin_nav';
import { Link } from 'react-router-dom';

const ManageFeatured = () => {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [featuredimage,setFeaturedimage] = useState()
  
  useEffect(() => {
    // Fetch featured data
    axios.get('http://localhost:8000/api/featured')
      .then((res) => {
        const featuredData = res.data;
        setFeatured(featuredData);

        // Extract category IDs from featured data
        const categoryIds = featuredData.map((result) => result.category);

        // Fetch category data based on category IDs
        axios.get('http://localhost:8000/api/categories/')
          .then((response) => {
            const categoryData = response.data;

            // Filter categories that match the category IDs from featured data
            const filteredCategories = categoryData.filter((category) =>
              categoryIds.includes(category._id)
            );
            // console.log(filteredCategories);
            setCategories(filteredCategories);
          })
          .catch((error) => {
            console.error('Error fetching categories:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching featured data:', error);
      });
  }, []);

  const handleDelete=(productId)=>{
        //  console.log(productId);
         axios.delete(`http://localhost:8000/api/featured/${productId}`)
         .then(()=>{
          setFeatured((prevProducts) => prevProducts.filter((product) => product._id !== productId));    
          alert("Deleted succefully")

         }).catch((error)=>{
          console.log(error);
         })
  }

  return (
    <div>
      <Admin_nav />
      <div>
        <h1>Manage Featured Data</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Featured Image</th>
              <th>Category</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {featured.map((item, index) => (
              <tr key={index}>
                {/* <td>{item.featuredimage}</td> */}
                <td>
                  {item.featuredimage && (
                    <img
                      src={`data:image/png;base64,${item.featuredimage}`}
                      alt={item.name}
                      className="img-thumbnail"
                      style={{ width: "130px", height: "100px" }}
                    />
                  )}
                </td>
                <td>{categories.find(category => category._id === item.category)?.name}</td>
                <td><Link to={`/edit-featured/${item._id}`}><FaEdit /></Link></td>
                <td><button onClick={(e)=>handleDelete(item._id)}><FaTrash /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageFeatured;
