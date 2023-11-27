import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { FaExchangeAlt,FaSearchPlus } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { DiGitCompare } from "react-icons/di";
import { BsCircle } from "react-icons/bs";
import {LiaRupeeSignSolid} from "react-icons/lia"
import axios from "axios";
import Header from "../UserNav/Header";
import Footer from "../Footer/Footer";

const Products = ({ addToCart, addToCompare }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      axios
        .get(`http://localhost:8000/api/products`)
        .then((res) => {
          const item = res.data;
          setProducts(item);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    const handleAddToCart = (product) => {
      // Create a new product object with the selected fields
      const productToAdd = {
        priceAfterDiscount: product.priceAfterDiscount,
        image: product.image,
        title: product.title,
        Discount: product.Discount,
      };
  
      // Add the product to the cart in state
      addToCart(productToAdd);
      alert("added to cart");
      // Add the product to localStorage
      const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
      localStorage.setItem(
        "cart",
        JSON.stringify([...cartFromLocalStorage, productToAdd])
      );
    };
    const handleAddToCompare = (product) => {
      const productToCompare = {
        price: product.price,
        priceAfterDiscount: product.priceAfterDiscount,
        image: product.image,
        title: product.title,
        Discount: product.Discount,
        description: product.description,
      };
      addToCompare(productToCompare);
      alert("added to compare");
  
      const compareFromLocalStorage =
        JSON.parse(localStorage.getItem("compare")) || [];
      localStorage.setItem(
        "compare",
        JSON.stringify([...compareFromLocalStorage, productToCompare])
      );
    };
  
    return (
      <div>
        <Header />
        {/* <UserSidebar /> */}
        <div className="flex ml-[80px] mr-[80px]">
          <div className="container mt-2 mx-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <div key={product.id}>
                  <div className="bg-white shadow-md rounded-md">
                    <div className="h-[190px]">
                      <img
                        src={`data:image/png;base64,${product.image}`}
                        alt={product.title}
                        className="peer w-[290px] h-48 object-cover rounded-t-md relative"
                      />
                      <div className="hidden peer peer-hover:flex hover:flex flex-col ml-[10px] pt-[10px] mt-[-130px] cursor-pointer">
                        <div>
                          {" "}
                          <a className="z-10" onClick={() => handleAddToCart(product)}>
                            <BsCircle className=" text-[30px] bg-white rounded-full absolute" />
                            <GiShoppingCart className="absolute text-[20px] mt-1 ml-1" />
                          </a>
                        </div>
                        <div className="mt-[40px]">
                          <a className="z-10" onClick={() => handleAddToCompare(product)}>
                            <BsCircle className=" text-[30px] bg-white rounded-full absolute" />
                            <DiGitCompare className="absolute text-[20px] mt-1 ml-1" />
                          </a>
                        </div>
                        <div className="mt-[40px]">
                          <a className="z-10" href={`/productdetails/${product._id}`}>
                            <BsCircle className=" text-[30px] bg-white rounded-full absolute" />
                            <FaSearchPlus className="absolute text-[20px] mt-[5px] ml-[5px]" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 h-[140px]">
                      <Link to={`/productdetails/${product._id}`}>
                        <h5 className="text-xl font-semibold text-blue-600 hover:underline ">
                          {product.title}
                        </h5>
                      </Link>
                      <div className="flex justify-between cursor-pointer">
                      <p className="text-gray-500 line-through flex">
                        <LiaRupeeSignSolid className="mt-[4px]"/> {product.price}/-
                      </p>
                      <p className="text-red-600 text-xl font-semibold flex">
                      <LiaRupeeSignSolid className="mt-[4px]"/>{product.priceAfterDiscount}/-
                      </p>
                      <p className="text-green-600">{product.Discount}% Off</p>
                      </div>
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };  

export default Products
