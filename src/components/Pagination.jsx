import React from "react";
import ReactPaginate from "react-paginate";
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'; // Import icons from React Icons

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <div>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={onPageChange}
        containerClassName="pagination flex "
        activeClassName="bg-gray-500 text-white"
        previousLabel={<RiArrowLeftSLine />} // Gunakan icon panah kiri
        nextLabel={<RiArrowRightSLine />} // Gunakan icon panah kanan
        breakLabel="..."
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        pageClassName="mx-1 border border-gray-300 rounded-sm px-3 py-1 hover:bg-blue-200 flex items-center justify-center cursor-pointer"
        previousClassName="mx-1 border border-gray-300 rounded-sm px-2 py-1 hover:bg-blue-200 flex items-center justify-center cursor-pointer"
        nextClassName="mx-1 border border-gray-300 rounded-sm px-2 py-1 hover:bg-blue-200 flex items-center justify-center cursor-pointer"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
};

export default Pagination;
