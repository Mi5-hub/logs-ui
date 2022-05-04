import React from "react";
import { useDispatch } from "react-redux";
import {
  paginateState,
  paginatePrevious,
  paginateNext,
} from "../../slice/paginateSlice";

function Pagination({ totalLogs, logsperpage, retraceTable, getAllLogs }) {
  const dispatch = useDispatch();
  const pageNumbers = [];
  for (let index = 1; index <= Math.ceil(totalLogs / logsperpage); index++) {
    pageNumbers.push(index);
  }
  return (
    <nav aria-label="Page navigation example " className="mt-5 float-right">
      <ul className="inline-flex -space-x-px">
        <li
          onClick={() => {
            dispatch(paginatePrevious());
            getAllLogs();
            retraceTable();
          }}
        >
          <a className="a_previous py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Previous
          </a>
        </li>
        {pageNumbers.map((el) => (
          <li key={el} style={{ cursor: "pointer" }}>
            <a
              className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-whitepy-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => {
                dispatch(paginateState(el));
                getAllLogs();
                retraceTable();
              }}
            >
              {el}
            </a>
          </li>
        ))}
        <li
          onClick={() => {
            dispatch(paginateNext());
            getAllLogs();
            retraceTable();
          }}
        >
          <a className="a_next py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
