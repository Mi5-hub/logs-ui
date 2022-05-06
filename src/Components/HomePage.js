import React, { useEffect, useState } from "react";
import DataGrid from "./Homepage/DataGrid";
import axios from "axios";


function HomePage() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setRows(response.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={options}
        columnHeight={1}
        globalSearch={true}
        options={true}
        paginations={true}
      />
    </div>
  );
}

export default HomePage;

const columns = [
  { field: "title", headerName: "TITLE", width: 5 },
  { field: "userId", headerName: "USER", width: 5  },
  { field: "body", headerName: "BODY  ", width: 5 },
];
const options = [
  {
    value: 5,
    label: "5",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 15,
    label: "15",
  },
];