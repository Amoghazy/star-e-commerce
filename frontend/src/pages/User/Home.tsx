import { Link, useLocation } from "react-router-dom";

export default function Home() {
  console.log(useLocation());
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect");
  console.log( redirect);
  console.log(sp);
  return (
    <div>
      Home <Link to="/admin">Admin</Link>
    </div>
  );
}
