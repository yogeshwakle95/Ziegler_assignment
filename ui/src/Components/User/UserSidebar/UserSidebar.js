import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageCarousel from "./ImageCarousel";
import { PiTextAlignLeftBold } from "react-icons/pi";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const UserSidebar = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories")
      .then((res) => {
        const items = res.data;
        setCategories(items);

        items.forEach((category) => {
          axios
            .get(
              `http://localhost:8000/api/categories/${category._id}/subcategories`
            )
            .then((subRes) => {
              setSubcategories((prevState) => ({
                ...prevState,
                [category._id]: subRes.data,
              }));
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="bg-[#F2F2F2] mt-[-10px]">
      <div className="flex ml-[100px]">
        <div className="mt-[-60px]">
          <h1 className=" bg-[rgb(255,92,0)] pl-2 text-white h-[50px] flex items-center font-bold rounded-t-lg justify-between">
            <PiTextAlignLeftBold className="text-[20px]" />
            <div className="p pl-4">All Departments</div>
            <div>
              <MdOutlineArrowDropDownCircle className=" text-[20px] pr-[1px]" />
            </div>
          </h1>
          {categories.map((category) => (
            <div key={category._id}>
              <button className="peer text-black w-[220px] h-[50px] text-start pl-8 border-b-2 border-[#E1E1E1] bg-white">
                <div className=" hover:text-[rgb(255,92,0)] flex justify-between items-center">
                  <div className=""> {category.name} </div>

                  <div>
                    <IoIosArrowForward className="" />
                  </div>
                </div>
              </button>
              {subcategories[category._id] && (
                <div className="hidden peer-hover:flex hover:flex w-[200px] flex-col bg-white drop-shadow-lg ml-[220px] absolute z-10 mt-[-40px] ">
                  {subcategories[category._id].map((subcategory) => (
                    <a
                      key={subcategory._id}
                      className="pl-[35px] py-2  hover:text-[rgb(255,92,0)] border-b-2 border-[#E1E1E1]"
                    >
                      <Link to={`/productbysubcat/${subcategory._id}`}>
                        {subcategory.name}
                      </Link>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div>
          <ImageCarousel />
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
