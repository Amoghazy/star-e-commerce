/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Pagenation({
  numberOfPages,
  setPage,
  currentPage,
}: {
  numberOfPages: number;
  setPage: any;
  currentPage: number;
}) {
  return (
    <div className="inline-flex items-center justify-center gap-3">
      <button
        onClick={() => {
          setPage(currentPage - 1);
        }}
        disabled={currentPage == 1}
        className="inline-flex items-center justify-center text-gray-900 bg-white border border-gray-100 rounded cursor-pointer size-8 rtl:rotate-180"
      >
        <span className="sr-only">Next Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3 h-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <p className="text-xs text-white">
        {currentPage}
        <span className="mx-0.25">/</span>
        {numberOfPages}
      </p>

      <button
        onClick={() => {
          setPage(currentPage + 1);
        }}
        disabled={currentPage === numberOfPages}
        className="inline-flex items-center justify-center text-gray-900 bg-white border border-gray-100 rounded cursor-pointer size-8 rtl:rotate-180"
      >
        <span className="sr-only">Next Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3 h-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
