/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { useEffect, useState } from "react";

import { GoArrowDown } from "react-icons/go";
import {
  setCheckedBrand,
  setCheckedCategory,
  setPriceSearch,
} from "../../redux/slices/shopSlice";
import { useGetBrandsByCategoryQuery } from "../../redux/api/productApiSilce";

export default function ShopFilter() {
  const dispatch = useDispatch();
  const [moreBrands, setMoreBrands] = useState(10);
  const [price, setPrice] = useState<string | null>(null);

  const { data: allCategories } = useGetAllCategoriesQuery();
  const { checkedCategory, checkedBrand } = useSelector(
    (state: any) => state.shop
  );
  const { data: brandsByCategory } =
    useGetBrandsByCategoryQuery(checkedCategory);

  const handelCheckCategory = (value: boolean, id: string) => {
    const checked = value
      ? [...checkedCategory, id]
      : checkedCategory.filter((item: string) => item !== id);
    dispatch(setCheckedCategory(checked));
  };

  const handelCheckBrand = (value: boolean, name: string) => {
    if (name.includes("&")) name = name.split("&")[0];
    const checked = value
      ? [...checkedBrand, name]
      : checkedBrand.filter((item: string) => item !== name);
    dispatch(setCheckedBrand(checked));
  };

  const handelPrice = () => {
    dispatch(setPriceSearch(price));
  };

  const handelReset = () => {
    dispatch(setPriceSearch(null));
    dispatch(setCheckedBrand([]));
    dispatch(setCheckedCategory([]));

    const categoryCheckboxes = document.querySelectorAll(
      'input[type="checkbox"][id^="category-"]'
    );
    const brandCheckboxes = document.querySelectorAll(
      'input[type="checkbox"][id^="brand-"]'
    );

    categoryCheckboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });

    brandCheckboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });
  };
  useEffect(() => {
    return () => {
      handelReset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-[40%] lg:w-[25%]  flex flex-col fixed top-3 h-[calc(100vh-40px)] overflow-y-scroll scroll-wrapper ">
        <div className="p-4 pb-10 bg-neutral-950">
          <h1 className="p-1 text-center text-white rounded bg-neutral-900">
            Filter By Category
          </h1>

          <div className="grid content-center grid-cols-2 ">
            {allCategories?.data?.map(
              (category: { name: string; _id: string }) => (
                <label
                  key={category?._id}
                  htmlFor={`category-${category?._id}`}
                  className=" flex cursor-pointer items-center gap-1 p-1 my-2 has-[:checked]:text-primary"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded text-primary focus:ring-0 focus-visible:border-none focus-visible:outline-none checked:ring-0 checked:border-none checked:outline-none"
                      id={`category-${category?._id}`}
                      onChange={(e) =>
                        handelCheckCategory(e.target.checked, category?._id)
                      }
                    />
                  </div>

                  <div>
                    <span className="text-xs text-ellipsis line-clamp-1">
                      {category?.name}
                    </span>
                  </div>
                </label>
              )
            )}
          </div>
          <h1 className="p-1 text-center text-white rounded bg-neutral-900">
            Filter By Brand
          </h1>

          <div className="grid content-center grid-cols-2 ">
            {brandsByCategory?.data
              ?.slice(0, moreBrands)
              ?.map((b: any, i: number) => (
                <label
                  key={b + i}
                  htmlFor={`brand-${b + i}`}
                  className=" flex cursor-pointer items-center gap-1 p-1 my-2 has-[:checked]:text-primary"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded text-primary focus:ring-0 focus-visible:border-none focus-visible:outline-none checked:ring-0 checked:border-none checked:outline-none"
                      id={`brand-${b + i}`}
                      onChange={(e) => handelCheckBrand(e.target.checked, b)}
                    />
                  </div>

                  <div>
                    <span className="text-xs text-ellipsis line-clamp-1">
                      {b}
                    </span>
                  </div>
                </label>
              ))}
            <button
              onClick={() => {
                setMoreBrands((prev) => 10 + prev);
              }}
              className={`${
                moreBrands >= brandsByCategory?.data?.length ? "hidden" : ""
              } flex items-center justify-center w-full col-span-2 p-1 border rounded-md hover:bg-primary`}
            >
              show more..
              <GoArrowDown />
            </button>
          </div>
          <h1 className="mt-3 text-sm">insert price filter (less than)</h1>
          <input
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            placeholder=" $0"
            type="number"
            className="inset-0 w-full my-3 border-none rounded-md focus:ring-0 text-gray-950 "
          />
          <button
            onClick={handelPrice}
            className="p-2 rounded-md bg-primary hover:bg-secondry"
          >
            {" "}
            Search
          </button>
          <button
            onClick={handelReset}
            className="block w-full p-2 mt-3 ml-auto bg-transparent border rounded-md hover:bg-red-900/60"
          >
            Reset Filter
          </button>
        </div>
      </div>
    </>
  );
}
