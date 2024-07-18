/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useGetAllOrdersQuery } from "../../redux/api/orderApiSlice";
import moment from "moment";
import Pagenation from "../../components/Pagenation";
import { useState } from "react";
import AdminMenu from "./AdminMenu";
export default function OrderList() {
  const [page, setPage] = useState(1);
  const { data: allOrders } = useGetAllOrdersQuery(page);
  return (
    <>
      <div className="container ">
        <AdminMenu />
        <h1 className="my-4 text-3xl font-bold text-center">All Orders</h1>
        <table className="mx-auto text-sm divide-y-2 divide-gray-200">
          <thead className="">
            <tr>
              <th className="px-0 py-2 font-medium text-gray-50 whitespace-nowrap">
                #
              </th>
              <th className="px-0 py-2 font-medium text-gray-50 whitespace-nowrap">
                ID
              </th>
              <th className="px-4 py-2 font-medium text-gray-50 whitespace-nowrap">
                DATE
              </th>
              <th className="px-4 py-2 font-medium text-gray-50 whitespace-nowrap">
                ITEMS
              </th>
              <th className="px-4 py-2 font-medium text-gray-50 whitespace-nowrap">
                TOTAL
              </th>
              <th className="px-4 py-2 font-medium text-gray-50 whitespace-nowrap">
                PAID
              </th>
              <th className="px-4 py-2 font-medium text-gray-50 whitespace-nowrap">
                DELIVERED
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {allOrders?.data?.map((item: any, index: number) => (
              <tr className="text-center" key={index}>
                <td className="px-4 py-2 font-medium text-gray-50 whitespace-nowrap">
                  {index + 1 + (page - 1) * 10}
                </td>
                <td className="px-4 py-2 font-medium text-gray-50 whitespace-nowrap">
                  {item._id}
                </td>
                <td className="px-4 py-2 font-medium text-gray-50 whitespace-nowrap">
                  {moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </td>
                <td className="px-4 py-2 text-gray-50 whitespace-nowrap">
                  {item.orderItems?.length}
                </td>
                <td className="px-4 py-2 text-gray-50 whitespace-nowrap">
                  ${item.totalPrice}
                </td>
                <td className="px-4 py-2 text-gray-50 whitespace-nowrap">
                  {item.isPaid ? (
                    <>
                      <div className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold bg-green-600 rounded-full">
                        Complated
                      </div>
                    </>
                  ) : (
                    <div className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold bg-yellow-300 rounded-full">
                      Pending
                    </div>
                  )}
                </td>
                <td className="px-4 py-2 ">
                  {item.isDelivered ? (
                    <>
                      <div className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold bg-green-600 rounded-full">
                        Complated
                      </div>
                    </>
                  ) : (
                    <div className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold bg-yellow-300 rounded-full">
                      Pending
                    </div>
                  )}
                </td>
                <td className="px-4 py-2 ">
                  <Link
                    to={`/order/${item._id}`}
                    className="block px-2 py-1 font-bold text-white rounded-full bg-primary hover:bg-secondry"
                  >
                    More
                  </Link>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={8} className="py-2 ">
                <div className="px-4 py-2 ml-auto text-gray-50 w-fit">
                  <Pagenation
                    setPage={setPage}
                    numberOfPages={allOrders?.numberOfPages}
                    currentPage={page}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
