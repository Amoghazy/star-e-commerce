import { Outlet } from "react-router-dom";
import Navigation from "./pages/Admin/Navigation";

function Layout() {
  return (
    <>
      <Navigation />
      <main className="py-4">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
