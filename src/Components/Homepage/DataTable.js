import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import axios from "axios";
import "../css/table.css";
const columns = [
  { field: "changedAt", headerName: "changedAt", width: 200 },
  { field: "login", headerName: "login", width: 200 },
  { field: "changedBy", headerName: "changedBy", width: 200 },
  {
    field: "serverType",
    headerName: "serverType",
    width: 200,
  },
  {
    field: "serverHost",
    headerName: "serverHost",
    width: 200,
  },
];

export default function DataTable() {
  const [dataLogs, setDataLogs] = useState([]);
  useEffect(() => {
    const getAllLogs = async () => {
      const logs = await axios.get("http://localhost:5050/logs");
      setDataLogs(logs.data);
    };
    getAllLogs();
  
  }, []);

  const selectMenu = async () => {
   try {
    await document.getElementById(":rb:").click();
    await document.querySelector("li.MuiMenuItem-root:nth-child(6)").click();
   } catch (error) {
     
   }
  };
  return (
    <div>
      <Button variant="contained" size="small" onClick={() => selectMenu()}>
        Menu
      </Button>
      <div
        style={{
          height: 400,
          width: "100%",
          background: "#0A1929",
          marginTop: "50px",
        }}
      >
        <DataGrid
          rows={dataLogs}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      </div>
    </div>
  );
}

// <div className="container_filter_cell">
// <li>
//   <input
//     type="checkbox"
//     onChange={(e) => selectAll()}
//     id="all"
//     name="all"
//   ></input>
//   All
// </li>
// {title.map((el) => (
//   <li>
//     <input
//       type="checkbox"
//       id={el}
//       onChange={(e) => filterColumn(el)}
//     ></input>{" "}
//     Hide {el}
//   </li>
// ))}
// </div>
// const showFilter = async () => {
//   if (showFilterCell) {
//     document.querySelector(".container_filter_cell").style.marginLeft =
//       "-1450px";
//     setShowFilterCell(false);
//   } else {
//     document.querySelector(".container_filter_cell").style.marginLeft = "0";
//     setShowFilterCell(true);
//   }
// };
// <div className="menu_table">
// <div className="menu_table_content">
//   <li>
//     <input
//       type="checkbox"
//       onChange={(e) => selectAll()}
//       id="all"
//       name="all"
//     ></input>
//     All
//   </li>
//   {title.map((el) => (
//     <li>
//       <input
//         type="checkbox"
//         id={el}
//         onChange={(e) => filterColumn(el)}
//       ></input>{" "}
//       Hide {el}
//     </li>
//   ))}
// </div>
// </div>