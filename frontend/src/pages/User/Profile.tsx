/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useUpdateProfileMutation } from "../../redux/api/userApiSlice";
import { FormEvent, useEffect, useState } from "react";
import { setUserInfo } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

export default function Profile() {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { userInfo } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [username, setName] = useState(userInfo?.username);
  const [email, setEmail] = useState(userInfo?.email);
  const [password, setPassword] = useState("");
  const handelUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (password.length < 5 && password.length > 0) {
        throw new Error("Password must be at least 5 characters long");
      }
      const result = await updateProfile({ username, email, password }).unwrap();
      dispatch(setUserInfo(result?.data));
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
      console.log(error);
    }
  };
  useEffect(() => {
    setName(userInfo?.username);
    setEmail(userInfo?.email);
  }, [userInfo]);
  return (
    <div className="container p-4 mx-auto mt-16">
      <div className="flex items-center justify-center">
        <div className="w-full p-6 lg:w-5/12 ">
          <h1 className="my-6 text-3xl font-semibold">Update Profile</h1>
          <form onSubmit={handelUpdateProfile}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium ">
                {" "}
                Name
              </label>
              <input
                value={username}
                type="text"
                onChange={(e) => setName(e.target.value)}
                name="name"
                id="name"
                className="w-full p-2 mt-2 bg-gray-600 border rounded-md outline-none focus:border-primary "
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium ">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                className="w-full p-2 mt-2 bg-gray-600 border rounded-md outline-none focus:border-primary "
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium ">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                value={password}
                placeholder="...................."
                className="w-full p-2 mt-2 bg-gray-600 border rounded-md outline-none placeholder-shown:text-xl focus:border-primary "
              />
            </div>

            <button
              className="relative inline-block my-4 rounded-md group "
              disabled={isLoading}
            >
              <span className="relative inline-block px-8 py-3 text-sm font-bold tracking-widest uppercase border-2 border-current rounded-md bg-primary group-active:text-opacity-75">
                {isLoading ? "Updating..." : "Update"}
              </span>
            </button>
            {isLoading && <Loader />}
          </form>
        </div>
      </div>
    </div>
  );
}
