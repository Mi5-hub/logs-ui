import React, { useEffect, useState } from "react";
import DataGrid from "./Homepage/DataGrid";
import axios from "axios";


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