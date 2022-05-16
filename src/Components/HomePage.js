import React, { useEffect, useState } from "react";

import axios from "axios";
import DataGrid from "./Homepage/datagrid-by-mino-randy";


function HomePage() {
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setData(response.data);
   
    };

    fetchData();

  }, []);


  return (
    <div>
      <DataGrid
        data={data}
        columns={columns}
        options
        // pageSize={5}
        // rowsPerPageOptions={options}
        columnHeight={3}
        // noGlobalSearch
        paginations
        headPositionText={'center'}
        bodyPositionText={'center'}
      />
    </div>
  );
}

export default HomePage;

const columns = [
  { field: "title", headerName: "TITLE", width: 200 },
  { field: "userId", headerName: "NUMBER", width: 50 },
  { field: "body", headerName: "BODY  ", width: 450 },
];
const options = [
  {
    value: 5,
    label: "Five",
  },
  {
    value: 10,
    label: "Ten",
  },
  {
    value: 20,
    label: "Twenty",
  },
];