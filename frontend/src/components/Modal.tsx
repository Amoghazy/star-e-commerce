/* eslint-disable @typescript-eslint/no-explicit-any */
import { RiCloseFill } from "react-icons/ri";

export default function Modal({
  textButton1,
  textButton2,
  setOpenModal,
  children,
  actionButton2,
  actionButton1,
}: {
  textButton1: string;
  textButton2: string;
  setOpenModal: any;
  children: any;
  actionButton2: any;
  actionButton1: any;
}) {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-40 ">
      <div
        className="w-4/12 p-4 bg-white border border-blue-100 shadow-lg rounded-2xl sm:p-6 lg:p-8"
        role="alert"
      >
        <div
          onClick={() => setOpenModal(false)}
          className="flex justify-end ml-auto cursor-pointer w-fit"
        >
          <span className="p-2 text-white rounded-full bg-primary hover:bg-red-700">
            <RiCloseFill size={22} fontSize={22} fontWeight={700} />
          </span>
        </div>

        {children}

        <div className="mt-6 sm:flex sm:gap-4">
          <button
            onClick={actionButton1}
            className="inline-block w-full px-5 py-3 text-sm font-semibold text-center text-white rounded-lg bg-primary hover:bg-secondry sm:w-auto"
          >
            {textButton1}
          </button>

          <button
            onClick={actionButton2}
            className="inline-block w-full px-5 py-3 mt-2 ml-auto text-sm font-semibold text-center text-gray-500 border rounded-lg hover:text-white hover:bg-red-700 bg-gray-50 sm:mt-0 sm:w-auto"
          >
            {textButton2}
          </button>
        </div>
      </div>
    </div>
  );
}
