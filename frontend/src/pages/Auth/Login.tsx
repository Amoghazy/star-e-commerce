/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import Alert from "../../components/Alert";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUserInfo } from "../../redux/slices/authSlice";
export default function Login() {
  const { userInfo } = useSelector((state: any) => state.auth);
  const [login, { isLoading, isError }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  });
  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const result = await login(values).unwrap();

      if (!isLoading && !isError) {
        toast.success("Login successful", {
          autoClose: 1000,
          position: "top-center",
          hideProgressBar: true,
        });
        dispatch(setUserInfo(result.data));

        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.data.message || error, {
        autoClose: 1000,
        position: "top-center",
        hideProgressBar: true,
      });
      console.error("error", error.data.message || error);
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
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(5, "Password must be at least 5 characters")
        .required("Password is required"),
    }),
  });
  return (
    <>
      <section className="flex flex-wrap pl-8 lg:pl-48 xl:pl-48">
        <div className="mt-20 mr-16 ">
          <h1 className="mb-8 text-2xl font-semibold">Sign In</h1>
          <form
            onSubmit={handleSubmit}
            className="container  sm:w-[20rem] mt-8 w-[18rem] md:w-[25rem] lg:w-[30rem] xl:w-[30rem]"
          >
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
                className="w-full p-2 mt-2 bg-gray-600 border rounded-md outline-none focus:border-primary "
              />
              {errors.password && touched.password && (
                <Alert message={errors.password} />
              )}
            </div>
            <button
              className="relative inline-block my-4 rounded-md group "
              disabled={isLoading || !isValid}
            >
              <span className="absolute rounded-md inset-0 translate-x-1.5 translate-y-1.5 bg-primary transition-transform group-hover:translate-x-0 group-hover:translate-y-0 group-hover:bg-secondry"></span>
              <span className="relative inline-block px-8 py-3 text-sm font-bold tracking-widest uppercase border-2 border-current rounded-md group-active:text-opacity-75">
                {isLoading ? "Signing..." : "Sign In"}
              </span>
            </button>
            {isLoading && <Loader />}
          </form>
          <div>
            <p>
              Don't have an account ? 
              <Link to="/register" className="text-primary">
                 Register
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
