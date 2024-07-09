/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Divider from "../../components/Divider";
import Loader from "../../components/Loader";
import {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../redux/api/categoryApiSlice";
import Modal from "../../components/Modal";
import { toast, ToastOptions } from "react-toastify";

export default function CategoryList() {
  const { data: categories, isLoading } = useGetAllCategoriesQuery();
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");

  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();
  const optionToast: ToastOptions = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
  };
  const createCategoryHandler = async () => {
    try {
      await createCategory(newCategoryName).unwrap();
      setNewCategoryName("");
      toast.success("Category created successfully", optionToast);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", optionToast);
    }
  };
  const deleteCategoryHandler = async () => {
    try {
      await deleteCategory(selectedCategoryId).unwrap();

      toast.success("Category deleted successfully", optionToast);

      setOpenModal(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", optionToast);
    }
  };

  const updateCategoryHandler = async () => {
    try {
      await updateCategory({
        name: selectedCategory,
        id: selectedCategoryId,
      }).unwrap();
      setOpenModal(false);
      toast.success("Category updated successfully", optionToast);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", optionToast);
    }
  };
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );

  return (
    <>
      {" "}
      <section className="container relative mx-auto min-w-96">
        <div className="flex p-12">
          <h1 className="text-3xl font-bold text-white">Category Mange</h1>
        </div>
        <div className="w-9/12 space-y-2 px-14">
          <input
            type="text"
            className="w-full p-4 text-black border-none rounded-lg outline-none focus:outline-none focus:ring-primary"
            placeholder="Set Category Name"
            onChange={(e) => setNewCategoryName(e.target.value)}
            value={newCategoryName}
          />

          <button
            onClick={createCategoryHandler}
            className="block p-4 ml-auto font-medium text-white rounded-lg hover:bg-secondry bg-primary"
          >
            Add Category
          </button>
        </div>
        <Divider text="Category List" cls="text-gray-400 pl-12 my-10" />
        <div className="box-border flex flex-wrap gap-4 px-28 ">
          {categories?.data.map((category: any) => (
            <button
              key={category._id}
              onClick={() => {
                setOpenModal(true);
                setSelectedCategory(category.name);
                setSelectedCategoryId(category._id);
              }}
              className="box-border p-4 font-medium text-white transition-all border-2 border-transparent rounded-lg cursor-pointer bg-primary hover:bg-secondry active:border-white hover:border-1"
            >
              {category.name.toUpperCase()}
            </button>
          ))}
        </div>
        {openModal && (
          <Modal
            textButton1="Update"
            textButton2="Delete"
            setOpenModal={setOpenModal}
            actionButton1={updateCategoryHandler}
            actionButton2={deleteCategoryHandler}
          >
            <input
              className="w-full p-4 my-4 text-black border border-gray-400 rounded-lg focus:outline-primary"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            ></input>
          </Modal>
        )}
      </section>
    </>
  );
}
