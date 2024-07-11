/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../redux/api/productApiSilce";
import momment from "moment";
import { FaArrowRight } from "react-icons/fa";
import AdminMenu from "./AdminMenu";
import Pagenation from "../../components/Pagenation";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { getImage } from "../../cashImage";
export default function AllProducts() {
  const [cuurentPage, setCurrentpage] = useState(1);
  const { data: allProducts, isLoading } = useGetAllProductsQuery(cuurentPage);
  const [images, setImages] = useState<any>({});
  useEffect(() => {
    if (allProducts && allProducts.data) {
      allProducts.data.forEach((product: any) => {
        getImage(product.image).then((cachedImage) => {
          if (cachedImage) {
            setImages((prev: any) => ({
              ...prev,
              [product.image]: URL.createObjectURL(cachedImage.blob),
            }));
          }
        });
      });
    }
  }, [allProducts]);
  if (isLoading) {
    return (
      <section className="flex items-center justify-center w-screen h-screen">
        <Loader />
      </section>
    );
  }
  return (
    <>
      <section className="container pl-20">
        <div className="flex flex-col">
          <div className="p-2 ">
            <div className="h-12 mb-4 text-3xl font-bold">
              All Products ({allProducts?.count})
            </div>
            <div className="flex flex-wrap items-center justify-around">
              {allProducts?.data?.map((product: any) => (
                <Link
                  to={`/admin/product/update/${product._id}`}
                  key={product._id}
                  className="block mb-3 overflow-hidden rounded-md hover:bg-primary hover:bg-opacity-30"
                >
                  <div className="flex">
                    <img
                      loading="lazy"
                      src={
                        images[product.image] ||
                        product?.image?.startsWith("https")
                          ? product?.image
                          : `/${product?.image}`
                      }
                      alt={product?.name}
                      className="object-cover w-36 h-36"
                    />

                    <div className="flex flex-col p-4">
                      <div className="flex items-center justify-between ">
                        {" "}
                        <h5 className="w-5/12 mb-2 text-xl font-semibold text-ellipsis line-clamp-1">
                          {product?.name?.substring(0, 25)}
                        </h5>
                        <p className="text-sm text-gray-500">
                          {" "}
                          {momment(product?.createdAt).format("MMMM DD YYYY")}
                        </p>
                      </div>
                      <p className="mb-2 text-gray-500 text-ellipsis line-clamp-1 lg:w-96 md:w-64 sm:w-60">
                        {product?.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Link
                          className="inline-flex items-center content-between px-2 py-2 text-sm font-medium text-center text-white rounded-md bg-primary hover:bg-secondry"
                          to={`/admin/product/update/${product._id}`}
                        >
                          Update Product{" "}
                          <FaArrowRight size={15} className="ml-1" />
                        </Link>

                        <p>${product?.price}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <Pagenation
            numberOfPages={allProducts?.pages}
            setPage={setCurrentpage}
            currentPage={cuurentPage}
          />
          <div className="p-3 mt-2 md:w-1/4">
            <AdminMenu />
          </div>
        </div>
      </section>
    </>
  );
}
