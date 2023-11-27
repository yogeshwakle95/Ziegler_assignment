import React, { useState, useEffect } from 'react';
import Admin_nav from '../Admin_nav/Admin_nav';
import axios from 'axios';

const Admin_AddCat = () => {
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  const handleChange = (e) => {
    setCategory(e.target.value);
    setErrors({ ...errors, name: '' });
  };

  


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
  
    if (category === '') {
      validationErrors.name = 'Category is required';
    } else if (category.length < 3) {
      validationErrors.name = 'Category name is too short';
    } else if (category.length > 32) {
      validationErrors.name = 'Category name is too long';
    }
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    try {
      // Check if categories is an array before using .some
      if (Array.isArray(categories)) {
        const categoryExists = categories.some((cat) => cat.name === category);    //if needed then convert it to the lower case

        // const categoryExists = categories.some((cat) => cat.name.toLowerCase() === category.toLowerCase());
  
        if (categoryExists) {
          setAlertMessage('Category already exists.');
        } else {
          const response = await axios.post('http://localhost:8000/api/categories', { name: category,
          // catImage:image.image
        });
          alert("success")
          console.log(response.data);
          // Handle successful category addition here
        }
      } else {
        // If categories is not an array, you can handle it as per your application's requirements
        console.error('Categories data is not an array:', categories);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // Fetch all categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/categories');
        setCategories(response.data); // Update the list of categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  

  return (
    <div>
      <Admin_nav />
      <div className="container" style={{ marginTop: '100px' }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
            
              <div className="form-group">
                <label htmlFor="name">Category Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={category}
                  onChange={handleChange}
                />
                {/* {errors.name && <small className="text-danger">{errors.name}</small>} */}
              </div>
              

              {/* {alertMessage && <div className="alert alert-danger">{alertMessage}</div>} */}

              <button type="submit" className="btn btn-primary" style={{ marginTop: '10px', backgroundColor:"blue" }}>
                Add category
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_AddCat;
