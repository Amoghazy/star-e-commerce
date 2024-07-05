/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShopping,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/slices/authSlice";

export default function Navigation() {
  const userInfo = useSelector((state: any) => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  console.log(userInfo);
  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };
  console.log(toggleDropDown, toggleSideBar);
  return (
    <div className="z-[999] hidden text-sm lg:flex xl:flex flex-col justify-between p-4 bg-black w-[4%] hover:w-[15%] h-screen fixed group transition-all duration-200 ease-in-out">
      <div className="flex flex-col justify-between ">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome size={20} className="mt-12 mr-2 text-white" />
          <span className="hidden mt-[3.2rem] transition-opacity duration-200 ease-in-out group-hover:block">
            Home
          </span>
        </Link>
        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping size={20} className="mt-12 mr-2 text-white" />
          <span className="hidden mt-12 transition-opacity duration-200 ease-in-out group-hover:block">
            Shop
          </span>
        </Link>
        <Link
          to="/cart"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart size={20} className="mt-12 mr-2 text-white" />
          <span className="hidden mt-12 transition-opacity duration-200 ease-in-out group-hover:block">
            Cart
          </span>
        </Link>
        <Link
          to="/fav"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <FaHeart size={20} className="mt-12 mr-2 text-white" />
          <span className="hidden mt-12 transition-opacity duration-200 ease-in-out group-hover:block">
            Favourite
          </span>
        </Link>
      </div>
      <div>
        <button
          onClick={toggleDropDown}
          className="flex items-center h-10 transition-transform transform hover:translate-x-2"
        >
          {userInfo ? <span>{userInfo.name}</span> : <></>}
        </button>
      </div>
      <div className="flex flex-col gap-4 pb-6">
        <Link
          to="/login"
          className="flex items-center h-10 transition-transform transform hover:translate-x-2"
        >
          <AiOutlineLogin size={20} className="mr-2 text-white " />
          <span className="hidden transition-opacity duration-200 ease-in-out group-hover:block">
            Login
          </span>
        </Link>
        <Link
          to="/register"
          className="flex items-center my-0 transition-transform transform hover:translate-x-2 "
        >
          <AiOutlineUserAdd size={20} className="mr-2 text-white " />
          <span className="hidden transition-opacity duration-200 ease-in-out group-hover:block">
            Register
          </span>
        </Link>
      </div>
    </div>
  );
}
