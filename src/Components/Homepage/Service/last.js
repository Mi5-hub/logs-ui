import axios from "axios";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import "../css/tableTailwind.css";
import FilterColumn from "./FilterColumn";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";
const _ = require("lodash");
function Table({ linkGetData }) {
  const [dataLogs, setDataLogs] = useState([]);
  const [title, setTitle] = useState([]);
  var logsValue = {};

  const [logsSearch, setLogsSearch] = useState([]);
  const [logsFilter, setLogsFilter] = useState([]);

  //****************************** START Pagination *****************************/
  const currentPage = useSelector((state) => state.page.value);
  const [logsPerPage, setLogsPerPage] = useState(10);
  const indexOfLastPost = currentPage * logsPerPage;
  const indexOfFirstPost = indexOfLastPost - logsPerPage;
  //****************************** END Pagination *****************************/

  const getAllLogs = async () => {
    const logs = await axios.get(linkGetData);
    setLogsFilter(logs.data);
    setDataLogs(logs.data.slice(indexOfFirstPost, indexOfLastPost));
    setTitle(
      _.without(
        Object.keys(logs.data[0]),
        "__v",
        "_id",
        "createdAt",
        "updatedAt",
        "response",
        "id"
      )
    );
  };

  useEffect(() => {
    getAllLogs();
  }, [currentPage, logsPerPage]);

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
  const [titleWithout, setTitleWithout] = useState([]);
  const searchColumnx = async (val, el) => {
    logsValue[el] = val;
    if (logsValue[el] === "") {
      console.log("====================================");
      console.log("tanteraka");
      console.log("====================================");
      await getAllLogs();
      await retraceTable();
      title.map((i) => {
        // document.querySelector(`#${i}-head > input[type=search]`).value = "";
      });
    } else {
      var resultFilter = [];
      var result = [];
      title.map((i) => {
        const cellContent = document.getElementsByClassName(i);
        for (let index = 0; index < cellContent.length; index++) {
          if (cellContent[index].style.display === "none") {
            titleWithout.push(i);
          }
        }
      });

      dataLogs.map((element) => {
        const logs = [element].filter((element) => element[el].startsWith(val));
        if (logs.length) {
          result.push(logs[0]);
        }
      });

      if (titleWithout.length) {
        result.map((o) => {
          resultFilter.push(_.omit(o, _.uniq(titleWithout)));
          setDataLogs(resultFilter);
        });
      } else {
        setDataLogs(result);
      }
    }
  };
  const searchColumn = async (val, el) => {
    logsValue[el] = val;
    if (logsValue[el] === "") {
      getAllLogs();
      logsValue = {};
    } else {
      var result = [];
      dataLogs.map((element) => {
        const logs = [element].filter((element) => element[el].startsWith(val));
        if (logs.length) {
          result.push(logs[0]);
        }
      });
      setDataLogs(result);
    }
  };

  const GlobalSearchLogs = async (e) => {
    const valueSearch = e.target.value;
    if (valueSearch === "") {
      getAllLogs();
      await retraceTable();
    } else {
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
    <div className="container mx-auto px-4 mt-5">
      <div className="mb-5 container_search">
        <TextField
          className="input_search"
          id="outlined-basic"
          label="Search"
          variant="outlined"
          size="small"
          onChange={(e) => GlobalSearchLogs(e)}
        />
        <TextField
          size="small"
          id="outlined-select-currency"
          select
          label="Page"
          value={logsPerPage}
          onChange={(e) => {
            setLogsPerPage(e.target.value);
            getAllLogs();
            retraceTable();
          }}
        >
          {pages.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="container_table">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <table
            className="w-full text-sm text-left text-gray-500 "
            id="table_logs"
          >
            <thead className="table_head">
              <tr>
                <th scope="col" className="px-6 py-1">
                  <FilterColumn linkGetData={linkGetData}></FilterColumn>
                </th>
                {title.map((el) => (
                  <th scope="col" className="px-6 py-1" id={`${el}-head`}>
                    <input
                      type="search"
                      onChange={(e) => {
                        searchColumn(e.target.value, el);
                      }}
                      placeholder={el}
                    ></input>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataLogs.map((el, index) => (
                <tr className="bg-white border-b  hover:bg-gray-50">
                  <td className={`px-6 py-4`}>{index}</td>
                  {Object.entries(
                    _.omit(el, [
                      "_id",
                      "id",
                      "__v",
                      "createdAt",
                      "updatedAt",
                      "response",
                    ])
                  ).map((i) => (
                    <td className={`px-6 py-4 ${i[0]}`} key={i[1]}>
                      {i[1]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        getAllLogs={getAllLogs}
        retraceTable={retraceTable}
        totalLogs={logsFilter.length}
        logsperpage={logsPerPage}
      ></Pagination>
    </div>
  );
}

export default Table;

const pages = [
  {
    value: 5,
    label: "5",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 50,
    label: "50",
  },
];
