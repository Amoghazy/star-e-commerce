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
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/slices/authSlice";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { toast } from "react-toastify";
export default function Navigation() {
  const userInfo = useSelector((state: any) => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState<boolean>(false);

  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };

  const toggleSideBar = (entering: boolean) => {
    if (!entering) {
      setDropDown(false);
    }
  };

  const [logoutUser] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      setDropDown(false);
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.info("Logout successful");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div
      className="z-[999] overflow-hidden hidden text-sm lg:flex xl:flex flex-col justify-between p-4 bg-black w-[4%] hover:w-[15%] h-screen fixed group transition-all duration-200 ease-in-out"
      onMouseOver={() => toggleSideBar(true)}
      onMouseLeave={() => toggleSideBar(false)}
    >
      <div className="flex flex-col justify-between my-4">
        <Link
          to="/"
          className="flex items-center py-2 my-2 transition-transform transform rounded hover:bg-primary hover:translate-x-2"
        >
          <AiOutlineHome size={20} className="mr-2 text-white " />
          <span className="hidden transition-opacity duration-200 ease-in-out group-hover:block">
            Home
          </span>
        </Link>
        <Link
          to="/shop"
          className="flex items-center py-2 my-2 transition-transform transform rounded hover:bg-primary hover:translate-x-2"
        >
          <AiOutlineShopping size={20} className="mr-2 text-white " />
          <span className="hidden transition-opacity duration-200 ease-in-out group-hover:block">
            Shop
          </span>
        </Link>
        <Link
          to="/cart"
          className="flex items-center py-2 my-2 transform rounded tansition-transform hover:bg-primary hover:translate-x-2"
        >
          <AiOutlineShoppingCart size={20} className="p-0 mr-2 text-white " />
          <span className="hidden transition-opacity duration-200 ease-in-out group-hover:block">
            Cart
          </span>
        </Link>
        <Link
          to="/fav"
          className="flex items-center py-2 my-2 transition-transform transform rounded hover:bg-primary hover:translate-x-2"
        >
          <FaHeart size={20} className="mr-2 text-white " />
          <span className="hidden duration-200 ease-in-out hiddentransition-opacity group-hover:block">
            Favourite
          </span>
        </Link>
      </div>

      <div className="relative ">
        <div className="inline-flex items-center ">
          {userInfo ? (
            <>
              <span className="font-bold text-center text-white shadow-sm shadow-zinc-400 group-hover:hidden">
                {userInfo?.username?.slice(0, 1)?.toUpperCase()}
              </span>
              <span className="hidden ml-1 mr-1 text-center text-white group-hover:block">
                {userInfo?.username}
              </span>
              <button
                onClick={toggleDropDown}
                className={`h-full ${
                  dropDown && "bg-slate-800"
                } text-white rounded-md hover:bg-slate-800 hover:text-white`}
              >
                {dropDown ? (
                  <RiArrowDropUpLine size={30} />
                ) : (
                  <RiArrowDropDownLine size={30} />
                )}
              </button>
            </>
          ) : (
            <></>
          )}
        </div>

        <div
          className={`absolute bottom-10 right-0 z-10 w-32  bg-slate-800    rounded-md shadow-lg   ${
            dropDown ? "block" : "hidden"
          }`}
        >
          <div className="p-2">
            <Link
              to={"/profile"}
              className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-primary hover:text-gray-700"
            >
              Profile
            </Link>
            {userInfo && userInfo?.isAdmin && (
              <>
                <Link
                  to={"/admin/dashboard"}
                  className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                >
                  Dashboard
                </Link>

                <Link
                  to={"/admin/users-list"}
                  className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                >
                  Users
                </Link>

                <Link
                  to={"/admin/products-list"}
                  className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                >
                  Products
                </Link>
                <Link
                  to={"/admin/category-list"}
                  className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                >
                  Categories
                </Link>
                <Link
                  to={"/admin/orders"}
                  className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                >
                  Orders
                </Link>
              </>
            )}
          </div>

          <div className="p-2">
            <button
              type="submit"
              onClick={handleLogout}
              className="flex items-center w-full gap-2 px-4 py-2 text-sm text-red-700 rounded-lg hover:bg-red-50"
            >
              <TbLogout2 size={20} />
              Log out
            </button>
          </div>
        </div>
      </div>

      {!userInfo && (
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
      )}
    </div>
  );
}
