import axios from "axios";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import "../css/tableTailwind.css";
import FilterColumn from "./FilterColumn";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";
import Service from "./Service/logsService";
const _ = require("lodash");
function Table() {
  const [dataLogs, setDataLogs] = useState([]);
  const [title, setTitle] = useState([]);
  var logsValue = {
    changedAt: "",
    changedBy: "",
    login: "",
    serverHost: "",
    serverType: "",
  };
  const [logsSearch, setLogsSearch] = useState([]);
  const [logsFilter, setLogsFilter] = useState([]);

  //****************************** START Pagination *****************************/
  const currentPage = useSelector((state) => state.page.value);
  const [logsPerPage, setLogsPerPage] = useState(10);
  const indexOfLastPost = currentPage * logsPerPage;
  const indexOfFirstPost = indexOfLastPost - logsPerPage;
  //****************************** END Pagination *****************************/

  const getAllLogs = async () => {
    const logs = await Service.getLogs()
    setLogsFilter(logs.data);
    setDataLogs(logs.data.slice(indexOfFirstPost, indexOfLastPost));
    setTitle(
      _.without(
        Object.keys(logs.data[0]),
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

  const fetchLogs = async (data) => {
    const response = await Service.postLogs(data)
    setDataLogs(response.data);
  };
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

  const postSearchLogs = async () => {
    if (
      logsValue["changedAt"] === "" &&
      logsValue["login"] === "" &&
      logsValue["changedBy"] === "" &&
      logsValue["serverType"] === "" &&
      logsValue["serverHost"] === ""
    ) {
      getAllLogs();
      await retraceTable();

      logsValue = {
        changedAt: "",
        changedBy: "",
        login: "",
        serverHost: "",
        serverType: "",
      };
    } else {
      fetchLogs(logsValue);
    }
  };
  const GlobalSearchLogs = async (e) => {
    const valueSearch = e.target.value;
    if (valueSearch === "") {
      getAllLogs();
      await retraceTable();
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
                  <FilterColumn></FilterColumn>
                </th>
                {title.map((el) => (
                  <th scope="col" className="px-6 py-1" id={`${el}-head`}>
                    <input
                      type="search"
                      onChange={(e) => {
                        logsValue[el] = e.target.value;
                        setTimeout(() => {
                          postSearchLogs();
                        }, 5000);
                      }}
                      placeholder={el}
                    ></input>
                  </th>
                ))}
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
