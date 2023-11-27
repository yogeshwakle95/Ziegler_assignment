import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import axios from 'axios';
import Admin_nav from '../Admin_nav/Admin_nav';

const EditFeatured = () => {
  const { id } = useParams();
  const [image, setImage] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/featured/${id}`)
      .then((res) => {
        const item = res.data;
        setImage(item.featuredimage);
        setSelectedCategory(item.category);
      });

    axios.get(`http://localhost:8000/api/categories/`)
      .then((res) => {
        const item = res.data;
        setCategories(item);
      });
  }, [id]);

  const handleImageUpload = (uploadedFile) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      setImage(base64);
    //   setFile(uploadedFile);
    };
    reader.readAsDataURL(uploadedFile);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
//   console.log(selectedCategory);

  const handleUpdate = () => {
    const handle={
       category:selectedCategory,
       featuredimage:image
    }

    axios.put(`http://localhost:8000/api/featured/${id}`, handle)
      .then((res) => {
        // Handle the response or perform any necessary actions
        console.log('Featured item updated:', res.data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error updating featured item:', error);
      });
  };

  return (
    <div>
      <Admin_nav />
      <button className="btn btn-primary" style={{ marginTop: '20px' }}>
        <Link to={'/admin/managefeatured'} style={{ textDecoration: 'none', color: 'white' }}>
          <IoIosArrowBack /> Back
        </Link>
      </button>
      <div className="container mt-3" style={{ width: '50%' }}>
        <form>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="form-control"
            >
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Image</label>
            <br />
            {image && (
              <img
                key={image}
                src={`data:image/png;base64,${image}`}
                alt="Product"
                className="img-fluid"
                style={{ width: '100px', height: '80px' }}
              />
            )}
            <input
              type="file"
              className="form-control"
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />
          </div>
        </form>
        <button className="btn btn-primary" onClick={handleUpdate}>
          Update Featured
        </button>
      </div>
    </div>
  );
};

export default EditFeatured;
