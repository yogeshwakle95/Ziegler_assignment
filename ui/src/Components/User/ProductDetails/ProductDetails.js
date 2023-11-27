import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaExchangeAlt } from "react-icons/fa";
import {LiaRupeeSignSolid} from "react-icons/lia"
import UserNav from '../UserNav/UserNav';
import Header from '../UserNav/Header';
import Footer from '../Footer/Footer';

const ProductDetails = ({ addToCart,addToCompare }) => {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const handleAddToCart = () => {
        // Create a new product object with the selected fields
        const productToAdd = {
          priceAfterDiscount: product.priceAfterDiscount,
          image: product.image,
          title: product.title,
          Discount:product.Discount
        };
    
        // Add the product to the cart in state
        addToCart(productToAdd);
    
        // Add the product to localStorage
        const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
        localStorage.setItem('cart', JSON.stringify([...cartFromLocalStorage, productToAdd]));
    };

    const handleAddToCompare = (product)=>{
        const productToCompare ={
            price:product.price,
            priceAfterDiscount:product.priceAfterDiscount,
            image:product.image,
            title:product.title,
            Discount:product.Discount,
            description:product.description,
        };
        addToCompare(productToCompare)
        alert("added to compare")
    
        const compareFromLocalStorage = JSON.parse(localStorage.getItem("compare")) || [];
        localStorage.setItem(
          "compare",
          JSON.stringify([...compareFromLocalStorage, productToCompare])
        );
      }
    

    return (
        <div>
            {/* <UserNav /> */}
            <Header />
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={`data:image/png;base64,${product.image}`}
                        alt={product.title}
                        style={{ width: '100%', maxHeight: '300px' }}
                    />
                </div>
                <div className="col-md-6">
                    <h1 className="mb-4">{product.title}</h1>
                    <p className="mb-4 flex">
                        <span className="text-muted flex">
                            <del className='flex'><LiaRupeeSignSolid className="mt-[4px]"/>{product.price}/-</del>
                        </span>
                        <span className="text-danger ml-4 h4 flex" style={{marginLeft:'10px'}}><LiaRupeeSignSolid className="mt-[4px]"/>{product.priceAfterDiscount}/-</span>
                        <span className="text-success ml-5" style={{marginLeft:'20px'}}>{product.Discount}% Off</span>
                        <span
                      className="text-success ml-4"
                      style={{ marginLeft: "20px" }}
                    >
                      <button onClick={()=> handleAddToCompare(product)}>
                        {/* <FaExchangeAlt size={20} color="blue" /> */}
                      </button>
                    </span>
                    </p>
                    <p className="mb-4">{product.description}</p>
                    <div className="d-flex">
                    <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>Add to Cart </button>
                        <button className="btn btn-success btn-lg " style={{marginLeft:"20px"}}>Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default ProductDetails;
