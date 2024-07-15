/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { useState } from "react";

import { GoArrowDown } from "react-icons/go";
import {
  setCheckedBrand,
  setCheckedCategory,
} from "../../redux/slices/shopSlice";
export default function ShopFilter({ brands }: { brands: string[] }) {
  const dispatch = useDispatch();
  const [moreBrands, setMoreBrands] = useState(10);
  const { data: allCategories } = useGetAllCategoriesQuery();
  const { checkedCategory, checkedBrand, allBrands } = useSelector(
    (state: any) => state.shop
  );

  const handelCheckCategory = (value: boolean, id: string) => {
    const checked = value
      ? [...checkedCategory, id]
      : checkedCategory.filter((item: string) => item !== id);
    dispatch(setCheckedCategory(checked));
  };

  const handelCheckBrand = (value: boolean, name: string) => {
    const checked = value
      ? [...checkedBrand, name]
      : checkedBrand.filter((item: string) => item !== name);
    dispatch(setCheckedBrand(checked));
  };
  brands = brands.length ? brands : allBrands;
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
                  htmlFor={category?.name}
                  className=" flex cursor-pointer items-center gap-1 p-1 my-2 has-[:checked]:text-primary"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded text-primary focus:ring-0 focus-visible:border-none focus-visible:outline-none checked:ring-0 checked:border-none checked:outline-none"
                      id={category?.name}
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
            {brands.slice(0, moreBrands)?.map((b: any, i) => (
              <label
                key={b + i}
                htmlFor={b + i}
                className=" flex cursor-pointer items-center gap-1 p-1 my-2 has-[:checked]:text-primary"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="border-gray-300 rounded text-primary focus:ring-0 focus-visible:border-none focus-visible:outline-none checked:ring-0 checked:border-none checked:outline-none"
                    id={b + i}
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
                moreBrands >= brands.length ? "hidden" : ""
              } flex items-center justify-center w-full col-span-2 p-1 border rounded-md hover:bg-primary`}
            >
              show more..
              <GoArrowDown />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
