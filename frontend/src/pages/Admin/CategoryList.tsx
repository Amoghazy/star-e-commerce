import Divider from "../../components/Divider";
import Loader from "../../components/Loader";
import {
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../redux/api/categoryApiSlice";

export default function CategoryList() {
  const { data: categories, isLoading } = useGetAllCategoriesQuery();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  console.log(categories);
  return (
    <section className="container mx-auto min-w-96">
      <div className="flex p-12">
        <h1 className="text-3xl font-bold text-white">Category Mange</h1>
      </div>
      <div className="w-9/12 space-y-2 px-14">
        <input
          type="text"
          className="w-full p-4 text-black border-none rounded-lg outline-none focus:outline-none focus:ring-primary"
          placeholder="Set Category Name"
        />

        <button className="block p-4 ml-auto font-medium text-white rounded-lg hover:bg-secondry bg-primary">
          Add Category
        </button>
      </div>
      <Divider text="Category List" cls="text-gray-400 pl-12 my-10" />
      <div className="box-border flex flex-wrap gap-x-4 px-28 ">
        {categories?.data.map((category: any) => (
          <div className="box-border p-4 font-medium text-white transition-all border-2 border-transparent rounded-lg cursor-pointer bg-primary hover:bg-secondry active:border-white hover:border-1">
            {category.name.toUpperCase()}
          </div>
        ))}
      </div>
    </section>
  );
}
