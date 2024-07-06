/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import Alert from "../../components/Alert";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUserInfo } from "../../redux/slices/authSlice";
export default function Register() {
  const { userInfo } = useSelector((state: any) => state.auth);
  const [register, { isLoading, isError }] = useRegisterMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  });
  const handleRegisteration = async (values: {
    email: string;
    password: string;
    username: string;
  }) => {
    try {
      const result = await register(values).unwrap();

      if (!isLoading && !isError) {
        toast.success("Registration successful", {
          autoClose: 1000,
          position: "top-center",
          hideProgressBar: true,
        });
        dispatch(setUserInfo(result?.data));
        navigate("/");
      }
    } catch (error: any) {
      toast?.error(error?.data?.message || error, {
        autoClose: 1000,
        position: "top-center",
        hideProgressBar: true,
      });
      console.error("error", error?.data?.message || error);
    }
  };
  const {
    handleChange,
    handleSubmit,
    isValid,
    handleBlur,
    touched,

    errors,
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",

      confirmPassword: "",
    },
    onSubmit: handleRegisteration,
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(5, "Password must be at least 5 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
  });
  return (
    <>
      <section className="flex flex-wrap pl-8 lg:pl-48 xl:pl-48">
        <div className="mr-16 mt-14 ">
          <h1 className="mb-8 text-2xl font-semibold">Register</h1>
          <form
            onSubmit={handleSubmit}
            className="container  sm:w-[20rem] mt-8 w-[18rem] md:w-[25rem] lg:w-[26rem] xl:w-[30rem]"
          >
            <div className="my-5">
              <label htmlFor="name" className="block text-sm font-medium ">
                Name
              </label>

              <input
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Enter your name"
                type="text"
                id="name"
                name="username"
                className="w-full p-2 mt-2 bg-gray-600 border rounded-md outline-none focus:border-primary "
              />
              {errors.username && touched.username && (
                <Alert message={errors.username} />
              )}
            </div>
            <div className="my-5">
              <label htmlFor="Email" className="block text-sm font-medium ">
                Email
              </label>

              <input
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="name@mail.com"
                type="email"
                id="Email"
                name="email"
                className="w-full p-2 mt-2 bg-gray-600 border rounded-md outline-none focus:border-primary "
              />
              {errors.email && touched.email && (
                <Alert message={errors.email} />
              )}
            </div>

            <div className="my-5">
              <label
                htmlFor="Password"
                className="block text-sm font-semibold "
              >
                Password
              </label>

              <input
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                id="Password"
                name="password"
                placeholder="Enter your password"
                className="w-full p-2 mt-2 bg-gray-600 border rounded-md outline-none focus:border-primary "
              />
              {errors.password && touched.password && (
                <Alert message={errors.password} />
              )}
            </div>
            <div className="my-5">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold "
              >
                Confirm Password
              </label>

              <input
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Confirm Password"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full p-2 mt-2 bg-gray-600 border rounded-md outline-none focus:border-primary "
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Alert message={errors.confirmPassword} />
              )}
            </div>
            <button
              className="relative inline-block my-4 rounded-md group "
              disabled={isLoading || !isValid}
            >
              <span className="absolute rounded-md inset-0 translate-x-0 translate-y-0 bg-primary transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5 group-hover:bg-secondry"></span>
              <span className="relative inline-block px-8 py-3 text-sm font-bold tracking-widest uppercase border-2 border-current rounded-md group-active:text-opacity-75">
                {isLoading ? "Loading..." : "Register"}
              </span>
            </button>
            {isLoading && <Loader />}
          </form>
          <div>
            <p>
              Already have an account ?
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
        <img
          src="/sign_up.svg"
          alt="signup"
          className="hidden w-1/2 mt-10 lg:block lg:w-5/12"
        />
      </section>
    </>
  );
}
