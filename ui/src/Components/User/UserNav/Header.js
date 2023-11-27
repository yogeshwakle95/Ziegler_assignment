import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

import { MdAccountCircle } from "react-icons/md";
import { RiArrowDropDownLine, RiArrowDropDownFill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { BiSolidHeartCircle } from "react-icons/bi";
import { GiShoppingCart } from "react-icons/gi";
import { VscGitCompare } from "react-icons/vsc";
import { BsCircle } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import {LiaRupeeSignSolid} from "react-icons/lia";
import {ImBoxRemove} from "react-icons/im";
import { BiChat } from "react-icons/bi";
// import img1 from "./Maxtech Logo_White.png";
import img1 from "./logo.jpg";

const Header = () => {
  const [brand, setBrand] = useState([]);
  const [laptop, setLaptop] = useState("");
  const [gamers, setGamers] = useState("");
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [, forceUpdate] = useState();
  const [role,setRole] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/brands")
      .then((res) => {
        setBrand(res.data);
      })
      .catch((error) => {
        console.error("Error loading brands:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories")
      .then((res) => {
        const item = res.data;
        const filteredData = item.find(
          (category) => category.name === "Hardaware"
        );
        const laptopFilterd = item.find(
          (category) => category.name === "laptop"
        );
        if (filteredData) {
          const gamersZoneId = filteredData._id;
          setGamers(gamersZoneId);
        }
        if (laptopFilterd) {
          const laptopId = laptopFilterd._id;
          setLaptop(laptopId);
        }
      })
      .catch((error) => {
        console.error("Error loading categories:", error);
      });
  }, []);

  useEffect(() => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
    // console.log(cartFromLocalStorage);
    setCartData(cartFromLocalStorage);
    
  },[]);
  // console.log(cartData);

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8000/api/products/search/${search}`)
      .then((res) => {
        setSearchData(res.data);
      })
      .catch((error) => {
        console.error("Error searching for products:", error);
      });
  };

  const handleRemove = (cartItem) => {
    // Remove the item from localStorage
    const updatedCart = cartData.filter((item) => item !== cartItem);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  
    // Update the state to reflect the changes
    setCartData(updatedCart);
  };

    useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole === "user") {
      setRole(true);
    }
  }, []);

  const handleLogout=()=>{
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    navigate('/')
  }
  

  return (
    <div>
      <div className="flex bg-[#F2F2F2]">
      <div className="w-[75%] h-[30px] flex justify-center items-center">
          Build your dream aircraft with Ziegler Aerospace{" "}
          <span className="text-[rgb(255,92,0)] font-bold px-2 cursor-pointer">
            <a href="/signup">Register</a>
          </span>{" "}
          or{" "}
          <span className="text-[rgb(255,92,0)] font-bold px-2 cursor-pointer">
            <a href="/signin">Login</a>
          </span>
        </div>
        {!role &&(
          <div
          className="w-[8%]  h-[40px] border-l-2 flex justify-center items-center hover:text-[rgb(255,92,0)] cursor-pointer"
          href="/signin"
        >
          <a href="/signin">Login</a>
        </div>
        )}
        {role && (
          <div
          className="w-[8%]  h-[40px] border-l-2 flex justify-center items-center hover:text-[rgb(255,92,0)] cursor-pointer"
          href="/signin"
        >
          <a href="/" onClick={handleLogout}>Logout</a>
        </div>
        )}
        
        <div className="w-[17%] h-[40px] border-l-2 flex justify-center items-center hover:text-[rgb(255,92,0)] cursor-pointer">
          <MdAccountCircle /> My Account <RiArrowDropDownLine />
        </div>
      </div>
      <div className="flex">
        <div className="w-[30%] h-[120px] flex items-center justify-center">
          <img src={img1} className="h-[100px] ml-[100px]" />
        </div>

        <div className="w-[40%] h-[120px] flex items-center justify-center ml-[100px]">
          <input
            type="text"
            placeholder="search"
            className="w-[80%] h-[40px] pl-[10px] border-2 border-[rgb(255,92,0)] "
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="w-[60px] h-[40px] rounded-r-3xl bg-[#2D2D2D] flex items-center justify-center hover:bg-[rgb(255,92,0)]"
            onClick={handleSearch}
          >
            <FaSearch className=" text-white" />
          </button>
        </div>
        <div className="w-[30%] h-[120px] flex items-center justify-center">
          <div>
            <TfiHeadphoneAlt className="text-3xl text-orange-500" />
          </div>
          <div className="pl-[30px]">
            <h1>
              <span className="font-bold">Call Us: </span>
              <span className="text-[rgb(255,92,0)]">033-40-550-550</span>
            </h1>
            <h1>Email: info@Ziegleraerospace.in</h1>
            <a className="text-[rgb(255,92,0)] cursor-pointer font-bold flex " href="/userchat">Let's Chat <BiChat className="text-2xl"/></a>
          </div> 
        </div>
      </div>

      <div className="ml-[400px]">
        {searchData.map((product) => (
          <div className="flex z-10 absolute mt-[-30px] bg-white items-center">
            <div>
              <img
                src={`data:image/png;base64,${product.image}`}
                className="w-[20px] h-[15px]"
              />
            </div>
            <div>
              <a className="pl-[10px]">
                <Link
                  to={`/productdetails/${product._id}`}
                  className="text-dark text-decoration-none"
                >
                  {product.title}
                </Link>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="flex h-[60px] bg-[#F2F2F2] items-center mb-2 w-[100%] ">
        <div className="ml-[370px] hover:text-[rgb(255,92,0)] cursor-pointer font-bold text-sm">
          <a href="/">HOME</a>
        </div>
        <div className="ml-[30px] hover:text-[rgb(255,92,0)] cursor-pointer font-bold text-sm">
          <a href={`/allproduct`}>PRODUCTS</a>
        </div>
        <div className="ml-[30px] ">
          <button className="peer flex items-center hover:text-[rgb(255,92,0)] cursor-pointer font-bold text-sm">
            BRAND STORE <RiArrowDropDownFill className="text-2xl ml-[-2px]" />
          </button>
          <div class="hidden peer-hover:flex hover:flex w-[250px] ml-[-60px] flex-col bg-white drop-shadow-lg z-10 absolute overflow-y-auto h-32 text-sm">
            {brand.map((brandItem, index) => (
              <a
                class="px-5 py-2 hover:bg-gray-200"
                key={index}
                href={`/productbybrand/${brandItem._id}`}
              >
                {brandItem.name}
              </a>
            ))}
          </div>
        </div>
        <div className="ml-[30px] hover:text-[rgb(255,92,0)] cursor-pointer text-sm">
          <a
            className="flex items-center font-bold"
            href={`/productbycategory/${gamers}`}
          >
            HARDWARE <RiArrowDropDownFill className="text-2xl ml-[-2px]" />
          </a>
        </div>
        
        <div className="ml-[30px] hover:text-[rgb(255,92,0)] cursor-pointer flex items-center font-bold text-sm">
          PRE-BUILT AIRCRAFT <RiArrowDropDownFill className="text-2xl ml-[-2px]" />
        </div>
        <div className="ml-[30px] hover:text-[rgb(255,92,0)] cursor-pointer flex items-center font-bold text-sm">
          BUILD YOUR AIRCRAFT <RiArrowDropDownFill className="text-2xl ml-[-2px]" />
        </div>
        <div className="ml-[40px] cursor-pointer">
          <AiOutlineHeart className="absolute mt-[7px] ml-[7px]" />
          <BsCircle className="text-3xl text-orange-500" />
        </div>
        <div className="ml-[20px] cursor-pointer">
          <a href="/productcompare">
            <VscGitCompare className="absolute mt-[7px] ml-[6px]" />{" "}
            <BsCircle className="text-3xl text-orange-500" />
          </a>
        </div>
        <div className=" cursor-pointer ">
          <button href="/productcart" className="peer cursor-pointer  ml-[20px]">
            <GiShoppingCart className="absolute mt-[7px] ml-[6px]" />{" "}
            <BsCircle className="text-3xl  text-orange-500" />
          </button>
          <div className="hidden peer-hover:flex hover:flex flex-col w-[360px] ml-[-200px] bg-white drop-shadow-lg absolute z-10">
            {cartData.map((cartItem, index) => (
              <div key={index} className="flex items-center mt-[-10px] border-b-2 justify-between">
                <div>
                  <a>
                    <img
                      // href="/productcart"
                      src={`data:image/png;base64,${cartItem.image}`}
                      className="w-[80px] h-[80px] p-[15px]"
                      alt={cartItem.title}
                    />
                  </a>
                </div>
                <div className="pl-[10px]">
                  <a className="ml-2 pt-4 ">{cartItem.title}</a>
                  <a className="flex mt-[10px]"><LiaRupeeSignSolid className="pt-[5px] text-xl"/>{cartItem.priceAfterDiscount}.00/-</a>
                </div>
                <div className="mt-[-30px] mr-[10px]">
                 <button onClick={()=> handleRemove(cartItem)}><ImBoxRemove /></button> 
               </div>
              </div>
            ))}
            <div className="flex items-center justify-between m-4">
            <a className="bg-black text-white p-2 rounded-lg hover:bg-orange-500" href="/productcart">View Cart</a>
            <a className="bg-black text-white p-2 rounded-lg hover:bg-orange-500">Checkout</a>
          </div>
          </div>
          
        </div> 
      </div>
    </div>
  );
};

export default Header;
