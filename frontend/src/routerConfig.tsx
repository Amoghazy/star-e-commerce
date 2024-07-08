import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/User/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/User/Profile";

import GardAdmin from "./gards/GardAdmin";
import UsersList from "./pages/Admin/UsersList";
import GardUser from "./gards/GardUser";
import CategoryList from "./pages/Admin/CategoryList";

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
            path: "category-list",
            element: (
              <GardAdmin>
                <CategoryList />
              </GardAdmin>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
