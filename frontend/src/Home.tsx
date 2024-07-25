import Header from "./components/Header";
import { useGetTopRatingProductsQuery } from "./redux/api/productApiSilce";
import IProduct from "./types/IProduct";
import Product from "./components/Product";

export default function Home() {
  const { data: topProducts } = useGetTopRatingProductsQuery();

  return (
    <section className="overflow-hidden ">
      <Header />

      <div className="px-20 mt-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold lg:text-3xl">
            Special Products
          </h1>
          <p className="p-2 rounded-md bg-primary md:rounded-full">View All</p>
        </div>
        <div className="grid grid-cols-1 gap-2 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
          {topProducts?.data?.slice(0, 10).map((product: IProduct) => (
            <>
              {" "}
              <div
                key={product._id}
                className="w-[20rem]  mx-auto   p-3  backdrop-blur-md"
              >
                <Product product={product} />
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
