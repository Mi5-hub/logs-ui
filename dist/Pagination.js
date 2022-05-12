import React from "react";
import { setGlobalState } from "./tableSlice";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Paginations({
  totalLogs,
  currentPage,
  logsperpage
}) {
  const pageNumbers = [];

  for (let index = 1; index <= Math.ceil(totalLogs / logsperpage); index++) {
    pageNumbers.push(index);
  }

  const handleChange = async (event, value) => {
    setGlobalState("currentPage", value);
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Pagination, {
    count: pageNumbers.length,
    page: currentPage,
    onChange: handleChange
  }));
}

export default Paginations;