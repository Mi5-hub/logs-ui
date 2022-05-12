import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import "./Table.css";
import FilterColumn from "./FilterColumn";
import Paginations from "./Pagination";
import { useGlobalState } from "./tableSlice";
const _ = require("lodash");
function DataGrid({
  columns,
  data,
  pageSize,
  rowsPerPageOptions,
  columnHeight,
  noGlobalSearch,
  options,
  paginations,
}) {
  const [dataLogs, setDataLogs] = useState([]);
  const title = [];
  columns.map((el) => {
    title.push(el.field);
  });
  var logsValue = {};

  const [logsFilter, setLogsFilter] = useState([]);

  //****************************** START Pagination *****************************/

  const [currentPage] = useGlobalState("currentPage");
  const [logsPerPage, setLogsPerPage] = useState(pageSize ? pageSize : 10);
  const indexOfLastPost = currentPage * logsPerPage;
  const indexOfFirstPost = indexOfLastPost - logsPerPage;

  //****************************** END Pagination *****************************/

  const getAllLogs = async () => {
    setLogsFilter(data);
    setDataLogs(data.slice(indexOfFirstPost, indexOfLastPost));
  };

  useEffect(() => {
    getAllLogs();
  }, [currentPage, logsPerPage, data, pageSize]);

  const retraceTable = async () => {
    title.map((el) => {
      const cellContent = document.getElementsByClassName(el);
      for (let index = 0; index < cellContent.length; index++) {
        cellContent[index].style.display = "table-cell";
        document.getElementById(`${el}-head`).style.display = "table-cell";
      }
    });
  };

  //********************** START SEARCH LOGS ****************************** */
  const searchColumn = async (val, el) => {
    logsValue[el] = val;
    if (logsValue[el] === "") {
      title.map((i) => {
        document.querySelector(`#${i}-head > input[type=search]`).value = "";
      });
      getAllLogs();
      await retraceTable();
    } else {
      var result = [];
      logsFilter.map((element) => {
        const logs = [element].filter((element) =>
          element[el].toString().startsWith(val)
        );
        if (logs.length) {
          result.push(logs[0]);
        }
      });
      setLogsFilter(result);
      setDataLogs(result);
    }
  };

  const GlobalSearchLogs = async (e) => {
    const valueSearch = e.target.value;
    if (valueSearch === "") {
      getAllLogs();
      await retraceTable();
    } else {
      await retraceTable();
      var result = [];
      logsFilter.map((element) => {
        title.map((el) => {
          const logs = [element].filter((element) =>
            element[el].toString().startsWith(valueSearch)
          );
          if (logs.length) {
            result.push(logs[0]);
          }
        });
      });
      setDataLogs(result);
    }
  };

  //********************** END SEARCH LOGS ****************************** */

  return (
    <div className="container_table">
      <div className="container_search">
        {noGlobalSearch ? null : (
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            size="small"
            onChange={(e) => GlobalSearchLogs(e)}
          />
        )}

        {options ? (
          <TextField
            size="small"
            id="outlined-select-currency"
            select
            value={logsPerPage}
            onChange={(e) => {
              setLogsPerPage(e.target.value);
              getAllLogs();
              retraceTable();
            }}
          >
            {rowsPerPageOptions
              ? rowsPerPageOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))
              : defaultOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
          </TextField>
        ) : null}
      </div>
      <div className="container_table">
        <div className="tbl-header">
          <table cellPadding="0" cellSpacing="0" border="0">
            <thead>
              <tr>
                <th className="first-column">
                  <FilterColumn title={title}></FilterColumn>
                </th>
                {columns.map((el) => (
                  <th id={`${el.field}-head`} style={{ textAlign: "left" }}>
                    <input
                      type="search"
                      onChange={(e) => {
                        searchColumn(e.target.value, el.field);
                      }}
                      placeholder={el.headerName}
                    ></input>
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table cellPadding="0" cellSpacing="0" border="0">
            <tbody>
              {dataLogs.map((el, index) => (
                <tr>
                  <td className="first-column"></td>
                  {columns.map((i) => (
                    <td className={`${i.field}`} style={{ textAlign: "left" }}>
                      {el[i.field]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {paginations ? (
        <Paginations
          getAllLogs={getAllLogs}
          currentPage={currentPage}
          retraceTable={retraceTable}
          totalLogs={logsFilter.length}
          logsperpage={logsPerPage}
        ></Paginations>
      ) : null}
    </div>
  );
}

export default DataGrid;

const defaultOptions = [
  {
    value: 5,
    label: "5",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 20,
    label: "20",
  },
];
