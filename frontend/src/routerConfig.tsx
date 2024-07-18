import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/User/Profile";

import GardAdmin from "./gards/GardAdmin";
import UsersList from "./pages/Admin/UsersList";
import GardUser from "./gards/GardUser";
import CategoryList from "./pages/Admin/CategoryList";
import ProductList from "./pages/Admin/ProductList";
import ProductUpdate from "./pages/Admin/ProductUpdate";
import AllProducts from "./pages/Admin/AllProducts";
import Favourites from "./pages/products/Favourites";
import ProductDetails from "./pages/products/ProductDetails";
import Cart from "./pages/User/Cart";
import Shop from "./pages/User/Shop";
import Shipping from "./pages/orders/Shipping";
import PlaceOrder from "./pages/orders/PlaceOrder";
import Order from "./pages/orders/Order";
import MyOrder from "./pages/orders/MyOrder";
import OrderList from "./pages/Admin/OrderList";
import Dashboard from "./pages/Admin/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <GardUser>
            {" "}
            <Home />
          </GardUser>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },

      {
        path: "favourites",
        element: <Favourites />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/shipping",
        element: (
          <GardUser>
            {" "}
            <Shipping />
          </GardUser>
        ),
      },
      {
        path: "/my-orders",
        element: (
          <GardUser>
            {" "}
            <MyOrder />
          </GardUser>
        ),
      },
      {
        path: "/checkout",
        element: (
          <GardUser>
            <PlaceOrder />,
          </GardUser>
        ),
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "profile",
        element: (
          <GardUser>
            <Profile />
          </GardUser>
        ),
      },
      {
        path: "order/:id",
        element: (
          <GardUser>
            <Order />
          </GardUser>
        ),
      },
      {
        path: "/admin",

        children: [
          {
            path: "users-list",
            element: (
              <GardAdmin>
                <UsersList />
              </GardAdmin>
            ),
          },
          {
            path: "orders-list",
            element: (
              <GardAdmin>
                <OrderList />
              </GardAdmin>
            ),
          },
          {
            path: "category-list",
            element: (
              <GardAdmin>
                <CategoryList />
              </GardAdmin>
            ),
          },
          {
            path: "products-list",
            element: (
              <GardAdmin>
                <ProductList />
              </GardAdmin>
            ),
          },
          {
            path: "allproducts",
            element: (
              <GardAdmin>
                <AllProducts />
              </GardAdmin>
            ),
          },
          {
            path: "product/update/:id",
            element: (
              <GardAdmin>
                <ProductUpdate />
              </GardAdmin>
            ),
          },
          {
            path: "dashboard",
            element: (
              <GardAdmin>
                <Dashboard />
              </GardAdmin>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
