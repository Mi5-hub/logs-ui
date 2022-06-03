import React, { useEffect, useState } from "react";
import axios from "axios";
import DataGrid from "./Homepage/datagrid-by-mino-randy";
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
      type: "datetime",
      optionSelect: [1, 2, 3, 4, 5, 6],
    },
    {
      field: "title",
      headerName: "DATE",
      width: 200,
      type: "select",
      optionSelect: [
        "qui est esse",
        "eum et est occaecati",
        "nesciunt quas odio",
        "magnam facilis autem",
        "dolorem dolore est ipsam",
        "optio molestias id quia eum",
      ],
    },
    {
      field: "userId",
      headerName: "NUMBER",
      width: 50,
      type: "number",
      condition: (element, field) => {
        return element[field] > 10 ? "#d85454" : "";
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
      if (data.id === 12) {
        response = "#6a822fbb";
      } else if (data.id > 10) {
        response = "#222b";
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
        data={''}
        columns={''}
        options
        // pageSize={5}
        // rowsPerPageOptions={options}
        columnHeight={3}
        // noGlobalSearch
        paginations
        // changeColorRow={changeColorRow}
        onDoubleClickFunction={editCell}
        // headPositionText={"center"}
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
