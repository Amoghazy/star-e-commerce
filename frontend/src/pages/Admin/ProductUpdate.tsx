/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import Alert from "../../components/Alert";
import * as Yup from "yup";
import Loader from "../../components/Loader";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { IoCloudUploadOutline } from "react-icons/io5";
import {
  useDeleteProductMutation,
  useGetProductsByIdQuery,
  useUpdateProductMutation,
} from "../../redux/api/productApiSilce";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal";

export default function ProductUpdate() {
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState<File | "">("");
  const [imagePtrview, setImagePtrview] = useState("");

  const { data: categories, isLoading: isLoadingCategories } =
    useGetAllCategoriesQuery();
  const [updateProduct, { isLoading: isUpdateLoading }] =
    useUpdateProductMutation();
  const { data: product, isLoading } = useGetProductsByIdQuery(id);
  const [deleteProduct, { isLoading: isDeleteLoading }] =
    useDeleteProductMutation(id);
  useEffect(() => {
    setImagePtrview(product?.data?.image ? `${product?.data?.image}` : "");
  }, [product]);
  const handelUpdateProduct = async (values: any) => {
    console.log(image);
    console.log(imagePtrview);
    const formData = new FormData();
    const file = image ? image : imagePtrview;
    formData.append("image", file);

    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        const element = values[key];

        formData.append(key, element);
      }
    }
    try {
      const result = await updateProduct({
        id: product?.data._id,
        data: formData,
      }).unwrap();
      console.log(result);
      if (!isUpdateLoading) {
        toast.success(result?.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
        });

        resetForm();
        setImage("");
        navigate("/admin/allproducts");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
  };
  const handelDeleteProduct = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const result = await deleteProduct(product?.data._id).unwrap();
      if (!isDeleteLoading) {
        toast.success(result?.message, {
          position: "top-center",
          style: {
            background: "red",
            color: "#fff",
          },
          autoClose: 1000,
          hideProgressBar: true,
        });
        navigate("/admin/allproducts");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
  };
  const {
    handleChange,
    handleSubmit,
    isValid,
    handleBlur,
    touched,
    resetForm,
    values,
    errors,
  } = useFormik({
    initialValues: {
      name: product?.data?.name,
      price: product?.data?.price,
      description: product?.data?.description,
      image: product?.data?.image,
      category: product?.data?.category,
      brand: product?.data?.brand,
      stock: product?.data?.countInStock,
      rating: product?.data?.rating,
    },
    enableReinitialize: true,
    onSubmit: handelUpdateProduct,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      price: Yup.number().required("Price is required"),
      description: Yup.string().required("Description is required"),
      image: Yup.string().required("Image is required"),
      category: Yup.string().required("Category is required"),
      brand: Yup.string().required("Brand is required"),
      stock: Yup.number().required("Stock is required"),
      rating: Yup.number().default(0),
    }),
  });

  if (isLoading)
    return (
      <section className="container flex items-center justify-center w-screen h-screen">
        <Loader />
      </section>
    );
  return (
    <section className="container pt-10 pl-10 mx-auto ">
      <AdminMenu />
      <h1 className="text-3xl font-bold">Create Products</h1>
      <div className="flex justify-around">
        <form
          onSubmit={handleSubmit}
          className="container grid grid-cols-6 gap-4 pl-12  sm:w-[20rem] mt-8 w-[18rem] md:w-[25rem] lg:w-[26rem] xl:w-[40rem]"
        >
          <div className="col-span-3">
            <label htmlFor="name" className="block text-sm font-medium ">
              Name
            </label>

            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              id="name"
              name="name"
              value={values.name}
              className="w-full p-2 mt-2 bg-transparent border rounded-md outline-none focus:border-primary "
            />
            {errors.name && touched.name && <Alert message={errors.name} />}
          </div>
          <div className="col-span-3">
            <label htmlFor="price" className="block text-sm font-medium ">
              Price
            </label>

            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="number"
              id="price"
              name="price"
              value={values.price}
              className="w-full p-2 mt-2 bg-transparent border rounded-md outline-none focus:border-primary "
            />
            {errors.price && touched.price && <Alert message={errors.price} />}
          </div>
          <div className="col-span-3">
            <label htmlFor="brand" className="block text-sm font-medium ">
              Brand
            </label>

            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              id="brand"
              value={values.brand}
              name="brand"
              className="w-full p-2 mt-2 bg-transparent border rounded-md outline-none focus:border-primary "
            />
            {errors.brand && touched.brand && <Alert message={errors.brand} />}
          </div>
          <div className="col-span-3 ">
            <label htmlFor="category" className="block text-sm font-medium ">
              Category
            </label>

            <select
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.category}
              name="category"
              id="category"
              className="w-full p-2 mt-2 font-medium text-white bg-transparent border-2 rounded-md focus:border-primary "
            >
              <option value="">Please select</option>
              {!isLoadingCategories ? (
                categories?.data?.map(
                  (category: { _id: string; name: string }) => (
                    <option
                      className="text-black"
                      key={category._id}
                      value={category._id}
                    >
                      {category.name}
                    </option>
                  )
                )
              ) : (
                <Loader />
              )}
            </select>

            {errors.category && touched.category && (
              <Alert message={errors.category} />
            )}
          </div>
          <div className="col-span-full">
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                {" "}
                Description
              </label>

              <textarea
                value={values.description}
                onBlur={handleBlur}
                onChange={handleChange}
                id="description"
                className="w-full mt-2 align-top bg-transparent rounded-lg shadow-sm outline-none text-w sm:text-sm focus:border-primary"
                rows={4}
                placeholder="Enter description..."
              ></textarea>
            </div>
          </div>
          <div className="col-span-3">
            <label htmlFor="stock" className="block text-sm font-medium ">
              Count In Stock
            </label>

            <input
              value={values.stock}
              onBlur={handleBlur}
              onChange={handleChange}
              type="number"
              id="stock"
              name="stock"
              className="w-full p-2 mt-2 bg-transparent border rounded-md outline-none focus:border-primary "
            />
            {errors.stock && touched.stock && <Alert message={errors.stock} />}
          </div>
          <div className="col-span-3">
            <label htmlFor="rating" className="block text-sm font-medium ">
              Rating
            </label>

            <input
              value={values.rating}
              onBlur={handleBlur}
              onChange={handleChange}
              type="number"
              max={5}
              id="rating"
              name="rating"
              className="w-full p-2 mt-2 bg-transparent border rounded-md outline-none focus:border-primary "
            />
            {errors.rating && touched.rating && (
              <Alert message={errors.rating} />
            )}
          </div>
          <div className=" col-span-full">
            <div className="items-center flex-1 max-w-screen-sm mx-auto mb-3 space-y-4 sm:flex sm:space-y-0">
              <div className="relative w-full">
                <div className="items-center ">
                  <label
                    className="flex justify-center w-full h-32 px-4 transition bg-transparent border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                    id="drop"
                  >
                    {image ? (
                      <div className="flex items-center justify-center">
                        {image.name}{" "}
                        <span
                          className="block w-8 ml-4 rounded-md hover:text-red-800 hover:bg-white"
                          onClick={(e) => {
                            e.preventDefault();

                            setImage("");
                          }}
                        >
                          <RiCloseFill className="mx-auto" size={20} />
                        </span>
                      </div>
                    ) : (
                      <span className="flex items-center space-x-2">
                        <IoCloudUploadOutline size={30} />

                        <span className="font-medium text-gray-600">
                          Drop Img to Attach, or
                          <span className="text-blue-600 underline ml-[4px]">
                            browse
                          </span>
                        </span>
                      </span>
                    )}
                    <input
                      type="file"
                      name="image"
                      className="hidden"
                      accept="image/png,image/jpeg"
                      id="image"
                      onClick={(e) => {
                        const target = e.target as HTMLInputElement;
                        target.value = "";
                      }}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        if (e.target.files) {
                          setImage(e.target.files[0]);
                          setImagePtrview("");
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
            {errors.image && touched.image && <Alert message={errors.image} />}
          </div>

          <button
            className="relative inline-block my-4 rounded-md w-fit group text-nowrap"
            disabled={isUpdateLoading || !isValid}
          >
            <span className="absolute px-4 py-3   rounded-md inset-0 translate-x-0 translate-y-0 text-primary hover:text-secondry bg-primary transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5 group-hover:bg-secondry"></span>
            <span className="relative inline-block px-4 py-3 text-sm font-bold tracking-widest uppercase border-2 border-current rounded-md group-active:text-opacity-75">
              {isUpdateLoading ? "Loading..." : "Update"}
            </span>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setOpenModal(true);
            }}
            className="relative inline-block my-4 ml-10 rounded-md w-fit group text-nowrap"
            disabled={isUpdateLoading || !isValid}
          >
            <span className="absolute px-4 py-3   rounded-md inset-0 translate-x-0 translate-y-0 text-primary hover:text-secondry bg-red-800 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5 group-hover:bg-red-600"></span>
            <span className="relative inline-block px-4 py-3 text-sm font-bold tracking-widest uppercase border-2 border-current rounded-md group-active:text-opacity-75">
              {isUpdateLoading ? "Loading..." : "Delete"}
            </span>
          </button>

          {isUpdateLoading && <Loader />}
        </form>
        <div className="flex items-start justify-center w-4/12 mt-10 ">
          <div className="w-10/12 p-4 bg-white border border-blue-100 shadow-lg min-h-48 lg:min-h-96 rounded-2xl sm:p-6 lg:p-8">
            {imagePtrview ? (
              <img
                src={"/" + values.image}
                alt=""
                className="object-cover w-full h-full rounded-2xl"
              />
            ) : image ? (
              <img
                src={URL.createObjectURL(image)}
                alt=""
                className="object-cover w-full h-full rounded-2xl"
              />
            ) : (
              <div className="flex font-semibold items-center justify-center w-full min-h-full text-gray-700 mt-[50%] rounded-2xl">
                Product Preview
              </div>
            )}
          </div>
        </div>
      </div>
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          textButton1="OK"
          textButton2="Cancel"
          actionButton1={handelDeleteProduct}
          actionButton2={() => setOpenModal(false)}
        >
          <p className="text-xl font-medium text-center text-black">
            {" "}
            {`Are you sure you want to delete this product`}
          </p>
        </Modal>
      )}
    </section>
  );
}
