import { Outlet } from "react-router-dom";
import Navigation from "./pages/Admin/Navigation";

function Layout() {
  return (
    <>
      <Navigation />
      <main className="py-4 pb-20">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
