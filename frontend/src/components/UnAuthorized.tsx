import { useNavigate } from "react-router-dom";

export default function UnAuthorized() {
  const router = useNavigate();
  return (
    <main className=" w-full h-screen flex flex-col justify-center items-center bg-[#000000]">
      <h1 className="font-extrabold tracking-widest text-white text-9xl">
        404
      </h1>
      <div className="absolute px-2 text-sm rounded bg-primary rotate-12">
        Page Need Auth
      </div>
      <button className="mt-5">
        <a className="relative inline-block text-sm font-medium text-[#ff3131] group active:text-orange-500 focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#d70909] group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span
            onClick={() => router("/")}
            className="relative block px-8 py-3 bg-[#000000] border border-current"
          >
            Go To Home
          </span>
        </a>
      </button>
    </main>
  );
}
