import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

export default function AdminMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="absolute block p-1 px-2 bg-gray-800 rounded-md z-[51] top-11 right-7 "
      >
        {open ? (
          <RiCloseFill size={25} scale={0.8} />
        ) : (
          <>
            <div className="h-0.5 w-6 bg-white rounded-sm my-2"></div>
            <div className="h-0.5 w-6 bg-white rounded-sm my-2"></div>
            <div className="h-0.5 w-6 bg-white rounded-sm my-2"></div>
          </>
        )}
      </button>
      {open && (
        <div className="fixed z-50 pb-5 space-y-5 bg-gray-800 rounded-md h-fit right-7 top-11 w-fit">
          <div className="px-4 mt-10">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `${
                  isActive ? "text-primary" : "text-white"
                } font-medium tesxt-sm hover:bg-gray-400 hover:bg-opacity-45 rounded-md p-2`
              }
            >
              Admin Dashboard
            </NavLink>
          </div>
          <div className="px-4 ">
            <NavLink
              to="/admin/allproducts"
              className={({ isActive }) =>
                `${
                  isActive ? "text-primary" : "text-white"
                } font-medium tesxt-sm hover:bg-gray-400 hover:bg-opacity-45 rounded-md p-2`
              }
            >
              All Products
            </NavLink>
          </div>
          <div className="px-4 ">
            <NavLink
              to="/admin/products-list"
              className={({ isActive }) =>
                `${
                  isActive ? "text-primary" : "text-white"
                } font-medium tesxt-sm hover:bg-gray-400 hover:bg-opacity-45 rounded-md p-2`
              }
            >
              Product List
            </NavLink>
          </div>

          <div className="px-4 ">
            <NavLink
              to="/admin/category-list"
              className={({ isActive }) =>
                `${
                  isActive ? "text-primary" : "text-white"
                } font-medium tesxt-sm hover:bg-gray-400 hover:bg-opacity-45 rounded-md p-2`
              }
            >
              Create Category
            </NavLink>
          </div>

          <div className="px-4 ">
            <NavLink
              to="/admin/orders-list"
              className={({ isActive }) =>
                `${
                  isActive ? "text-primary" : "text-white"
                } font-medium tesxt-sm hover:bg-gray-400 hover:bg-opacity-45 rounded-md p-2`
              }
            >
              Manage Orders
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}
