/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaMoneyBillWave, FaUser } from "react-icons/fa";
import {
  useGetTotalSalesDatedQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import {
  useGetAllUsersQuery,
  useGetNewUsersQuery,
} from "../../redux/api/userApiSlice";
import { HiUserAdd } from "react-icons/hi";
import { GiNetworkBars } from "react-icons/gi";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useGetTopProductsByQuarterQuery } from "../../redux/api/productApiSilce";

export default function Dashboard() {
  const { data: allUsers, isLoading: allUsersLoading } = useGetAllUsersQuery();
  const { data: totalSales, isLoading: totalSalesLoading } =
    useGetTotalSalesQuery();
  const { data: totalSalesDated, isLoading: totalSalesDatedLoading } =
    useGetTotalSalesDatedQuery();
  const { data: newUsers, isLoading: newUsersLoading } = useGetNewUsersQuery();
  const { data: bestProducts, isLoading: bestProductsLoading } =
    useGetTopProductsByQuarterQuery();
  const removeLeadingZeros = (dateString: string) => {
    const [day, month, year] = dateString.split("-");
    return `${parseInt(day, 10)}-${parseInt(month, 10)}-${year}`;
  };
  const formatDate = (date: Date) => {
    return removeLeadingZeros(
      `${String(date.getDate()).padStart(2, "0")}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${date.getFullYear()}`
    );
  };
  const dateToday = formatDate(new Date());

  const salesToday =
    totalSalesDated?.data?.filter(
      (item: any) => removeLeadingZeros(item._id) === dateToday
    ) || [];

  const dateYesterday = formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000));
  const salesYesterday =
    totalSalesDated?.data?.filter(
      (item: any) => removeLeadingZeros(item._id) === dateYesterday
    ) || [];

  const salesTodayTotal =
    salesToday?.length > 0 ? salesToday[0]?.totalSales : 0;
  const salesYesterdayTotal =
    salesYesterday?.length > 0 ? salesYesterday[0]?.totalSales : 0;

  const percentage =
    salesYesterdayTotal > 0
      ? ((salesTodayTotal - salesYesterdayTotal) / salesYesterdayTotal) * 100
      : salesYesterdayTotal === 0 && salesTodayTotal > 0
      ? 100 // You can choose a different value to represent the percentage increase from zero
      : 0;

  const [state, setState] = useState({
    options: {
      chart: {
        id: "apexchart-example",
      },
      yaxis: {
        labels: {},
      },
      xaxis: { labels: {}, categories: [] },
    },
    series: [
      {
        name: "series-1",
        data: [],
      },
    ],
  });
  const currentYear = new Date().getFullYear();
  const [stateProduct, setStateProduct] = useState<any>({
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%",
      },
      responsive: [],

      xaxis: {
        categories: [],
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "right",
        offsetX: 0,
        offsetY: 50,
      },
    },
    series: [],
  });

  useEffect(() => {
    if (bestProducts && bestProducts.length > 0) {
      const categories = [
        `${currentYear - 1}Q1`,
        `${currentYear - 1}Q2`,
        `${currentYear - 1}Q3`,
        `${currentYear - 1}Q4`,
        `${currentYear}Q1`,
        `${currentYear}Q2`,
        `${currentYear}Q3`,
        `${currentYear}Q4`,
      ];

      const transformedData = bestProducts.map((product: any) => {
        const salesByQuarter: any = {};

        product.salesData.forEach((sale: any) => {
          const key = `${sale.year}Q${sale.quarter}`;
          salesByQuarter[key] = sale.totalSales;
        });

        const data = categories.map(
          (category) => salesByQuarter[category] || 0
        );

        return {
          name: product.name,
          data: data,
        };
      });

      setState({
        options: {
          chart: {
            id: "apexchart-example",
          },
          yaxis: {
            labels: {
              style: {
                colors: "#FFFFFF",
              },
            },
          },
          xaxis: {
            labels: {
              style: {
                colors: "#FFFFFF",
              },
            },
            categories: totalSalesDated?.data
              ?.map((item: any) => item._id)
              .slice(0, 10),
          },
        },
        series: [
          {
            name: "series-1",
            data: totalSalesDated?.data
              ?.map((item: any) => item.totalSales.toFixed(2))
              .slice(0, 10),
          },
        ],
      });

      setStateProduct({
        series: transformedData,
        options: {
          chart: {
            type: "bar",
            height: 350,
            stacked: true,
            stackType: "100%",
          },
          colors: ["#7dccfc", "#0052CC", "rgba(0,227,150,1)"],
          responsive: [],
          plotOptions: {
            bar: {
              horizontal: false,
              barHeight: "100%",
              columnWidth: "40%",
            },
          },
          yaxis: {
            title: {
              text: "Total Sales",
              align: "center",
              offsetX: 0,
              offsetY: 0,
              floating: true,
              style: {
                fontSize: "12px",
                color: "#7dccfc",
              },
            },
          },
          xaxis: {
            categories,
            title: {
              text: "Quarter",
              style: {
                fontSize: "12px",
                color: "#7dccfc",
              },
            },
            labels: {
              style: {
                colors: [
                  "#FF5733",
                  "#33FF57",
                  "#3357FF",
                  "#FF33A5",
                  "#57FF33",
                  "#FF5733",
                  "#33FF57",
                  "#3357FF",
                ], // Example colors
              },
            },
          },
          fill: {
            opacity: 1,
          },
          legend: {
            position: "top",
            offsetX: 0,
            offsetY: 10,
            labels: {
              colors: "white",
              fontSize: "14px",
            },
          },
        },
      });
    }
  }, [
    allUsers,
    totalSales,
    bestProducts,
    totalSalesDated,
    newUsers,
    currentYear,
  ]);
  return (
    <>
      <div className="px-20 mt-10">
        <div className="grid mx-auto mb-12 gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
            <div className="absolute grid w-16 h-16 mx-4 -mt-4 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 shadow-blue-500/40 place-items-center">
              <FaMoneyBillWave size={25} />
            </div>
            <div className="p-4 text-right">
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-600">
                Today's Money
              </p>
              <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                ${salesTodayTotal?.toFixed(2)}
              </h4>
            </div>
            <div className="p-4 border-t border-blue-gray-50">
              <p className="block font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-600">
                {percentage > 0 ? (
                  <strong className="text-green-500">
                    +{percentage?.toFixed(2)}%
                  </strong>
                ) : (
                  <strong className="text-red-500">
                    {percentage?.toFixed(2)}%
                  </strong>
                )}
                &nbsp;than last Day
              </p>
            </div>
          </div>
          <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
            <div className="absolute grid w-16 h-16 mx-4 -mt-4 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-gradient-to-tr from-pink-600 to-pink-400 shadow-pink-500/40 place-items-center">
              <FaUser size={25} />
            </div>
            <div className="p-4 text-right">
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-600">
                All Users
              </p>
              <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {allUsers?.totalUsers}
              </h4>
            </div>
            <div className="p-4 border-t border-blue-gray-50">
              <p className="block font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-600">
                {allUsers?.totalUsers} Users Registered All Time
              </p>
            </div>
          </div>
          <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
            <div className="absolute grid w-16 h-16 mx-4 -mt-4 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-gradient-to-tr from-green-600 to-green-400 shadow-green-500/40 place-items-center">
              <HiUserAdd size={28} />
            </div>
            <div className="p-4 text-right">
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-600">
                New Clients
              </p>
              <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {newUsers?.data}
              </h4>
            </div>
            <div className="p-4 border-t border-blue-gray-50">
              <p className="block font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-600">
                New Users Registered Today
              </p>
            </div>
          </div>
          <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
            <div className="absolute grid w-16 h-16 mx-4 -mt-4 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-gradient-to-tr from-orange-600 to-orange-400 shadow-orange-500/40 place-items-center">
              <GiNetworkBars size={25} />
            </div>
            <div className="p-4 text-right">
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-600">
                Sales
              </p>
              <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                ${totalSales?.data?.totalSales?.toFixed(2)}
              </h4>
            </div>
            <div className="p-4 border-t border-blue-gray-50">
              <p className="block font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-600">
                Total Sales
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          <Chart
            options={state?.options}
            series={state?.series}
            type="bar"
            width={500}
            height={320}
            style={{ color: "gray" }}
          />

          <Chart
            options={stateProduct?.options}
            series={stateProduct?.series}
            type="bar"
            height={350}
            style={{ color: "gray", width: "100%" }}
          />
        </div>
      </div>
    </>
  );
}
