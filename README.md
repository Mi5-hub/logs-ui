# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
### images
[!image_upload]'https://github.com/Mi5-hub/logs-ui/blob/main/Screenshot%202022-06-03%20at%2017-20-57%20React%20App.png'

### `integral code example`

```
import React, { useEffect, useState } from "react";
import axios from "axios";
import DataGrid from "datagrid-by-mino-randy/dist/datagrid-by-mino-randy";
import Button from "@mui/material/Button";
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

  const columns = [
    {
      field: "id",
      headerName: "RANG",
      width: 50,
      type: "select",
      optionSelect: [1, 2, 3, 4, 5, 6],
    },
    { field: "title", headerName: "TITLE", width: 200, type: "string" },
    { field: "id", headerName: "DATE", width: 50, type: "datetime" },
    {
      field: "userId",
      headerName: "NUMBER",
      width: 50,
      type: "number",
      condition: (element, field) => {
        return element[field] > 2 ? "#d85454" : "";
      },
    },
    {
      field: "body",
      headerName: "BODY",
      width: 450,
      type: "string",
    },
      {
        field: "action",
        headerName: "ACTION",
        width: 100,
        renderCell: (cellValues) => {
          return (
            <Button
              size="small"
              variant="outlined"
              onClick={(event) => {
                handleEditRow(event, cellValues);
              }}
            >
              Editer
            </Button>
          );
        },
      },
  ];

  const changeColorRow = {
    background: (data) => {
      var response = null;
      if (data.id < 3) {
        response = '#6a822fbb'
      } else if(data.id > 3) {
        response = '#222b'
      }
      return response;
    },
  };

  const editCell = async (fullData) => {
    console.log("====================================");
    console.log("values******", fullData);
    console.log("====================================");
   
  };
  const handleEditRow = async (e, value) => {
    console.log("====================================");
    console.log("cellsValue", value);
    console.log("====================================");
  };

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
        changeColorRow={changeColorRow}
        onDoubleClickFunction={editCell}
        headPositionText={"center"}
        // bodyPositionText={"center"}
      />
    </div>
  );
}

export default HomePage;

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

```

