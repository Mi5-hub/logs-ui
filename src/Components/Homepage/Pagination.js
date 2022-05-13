import React from "react";
import { setGlobalState } from "./tableSlice";
import Pagination from "@mui/material/Pagination";
function Paginations({ totalLogs, currentPage, logsperpage }) {
  const pageNumbers = [];
  for (let index = 1; index <= Math.ceil(totalLogs / logsperpage); index++) {
    pageNumbers.push(index);
  }

  const handleChange = async (event, value) => {
    setGlobalState("currentPage", value);
  };
  return (
    <div>
      <Pagination
        count={pageNumbers.length}
        page={currentPage}
        onChange={handleChange}
      />
    </div>
  );
}

export default Paginations;
