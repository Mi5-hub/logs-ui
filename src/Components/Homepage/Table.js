import axios from "axios";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import "../css/tableTailwind.css";
import FilterColumn from "./FilterColumn";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";
const _ = require("lodash");
function Table() {
  const [dataLogs, setDataLogs] = useState([]);
  const [title, setTitle] = useState([]);
  var changedBy = "";
  var login = "";
  var changedAt = "";
  var serverType = "";
  var serverHost = "";
  const [logsSearch, setLogsSearch] = useState([]);
  const [logsFilter, setLogsFilter] = useState([]);
  const [isClickedAll, setIsClickedAll] = useState(false);

  //******************************  Pagination *****************************/
  const currentPage = useSelector((state) => state.page.value);
  const [logsPerPage, setLogsPerPage] = useState(5);
  const indexOfLastPost = currentPage * logsPerPage;
  const indexOfFirstPost = indexOfLastPost - logsPerPage;

  const getAllLogs = async () => {
    const logs = await axios.get("http://localhost:5050/logs");
    setLogsFilter(logs.data);
    setDataLogs(logs.data.slice(indexOfFirstPost, indexOfLastPost));
    setTitle(
      _.without(
        Object.keys(logs.data[1]),
        "__v",
        "_id",
        "createdAt",
        "updatedAt",
        "response"
      )
    );
  };

  useEffect(() => {
    getAllLogs();
  }, [currentPage, logsPerPage]);

  const GlobalSearchLogs = async (e) => {
    const valueSearch = e.target.value;
    if (valueSearch === "") {
      getAllLogs();
    } else {
      var logs = [];
      title.map((element) => {
        const response = _.filter(logsFilter, [element, valueSearch]);
        if (response.length) {
          logs = logsSearch.concat(response);
          setDataLogs(_.uniq(logs));
        }
      });
    }
  };

  const fetchLogs = async (data) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    const response = await axios.post("http://localhost:5050/logs", data);
    setDataLogs(response.data);
  };

  const postSearchLogs = async () => {
    const logs = [
      {
        changedAt,
        login,
        changedBy,
        serverType,
        serverHost,
      },
    ];

    if (
      changedAt === "" &&
      login === "" &&
      changedBy === "" &&
      serverType === "" &&
      serverHost === ""
    ) {
   
      // fetchLogs([{}])
      
    } else {
      fetchLogs(logs);
    }
  };

  //********************** SEARCH LOGS ****************************** */

  //********************** SEARCH LOGS ****************************** */

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
          onChange={(e) => setLogsPerPage(e.target.value)}
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
                  <FilterColumn isClickedAll={isClickedAll}></FilterColumn>
                </th>
                <th scope="col" className="px-6 py-1" id="changedAt-head">
                  <input
                    type="search"
                    onChange={(e) => {
                      changedAt = e.target.value;
                      setTimeout(() => {
                        postSearchLogs();
                      }, 1000);
                    }}
                    placeholder="ChangedAt"
                  ></input>
                </th>
                <th scope="col" className="px-6 py-1" id="login-head">
                  <input
                    type="search"
                    onChange={(e) => {
                      login = e.target.value;
                      setTimeout(() => {
                        postSearchLogs();
                      }, 1000);
                    }}
                    placeholder="Login"
                  ></input>
                </th>
                <th scope="col" className="px-6 py-1" id="changedBy-head">
                  <input
                    type="search"
                    onChange={(e) => {
                      changedBy = e.target.value;
                      setTimeout(() => {
                        postSearchLogs();
                      }, 1000);
                    }}
                    placeholder="ChangedBy"
                  ></input>
                </th>
                <th scope="col" className="px-6 py-1" id="serverType-head">
                  <input
                    type="search"
                    onChange={(e) => {
                      serverType = e.target.value;
                      setTimeout(() => {
                        postSearchLogs();
                      }, 1000);
                    }}
                    placeholder="Server Type"
                  ></input>
                </th>
                <th scope="col" className="px-6 py-1" id="serverHost-head">
                  <input
                    type="search"
                    onChange={(e) => {
                      serverHost = e.target.value;
                      setTimeout(() => {
                        postSearchLogs();
                      }, 1000);
                    }}
                    placeholder="ServerHost"
                  ></input>
                </th>
              </tr>
            </thead>
            <tbody>
              {dataLogs &&
                dataLogs.map((el, index) => (
                  <tr className="bg-white border-b  hover:bg-gray-50">
                    <td className={`px-6 py-4 `}>{index}</td>
                    <td className={`px-6 py-4 changedAt`}>{el.changedAt}</td>
                    <td className={`px-6 py-4 login`}>{el.login}</td>
                    <td className={`px-6 py-4 changedBy`}>{el.changedBy}</td>
                    <td className={`px-6 py-4 serverType`}>{el.serverType}</td>
                    <td className={`px-6 py-4 serverHost`}>{el.serverHost}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        totalposts={logsFilter.length}
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
    value: 20,
    label: "20",
  },
];
