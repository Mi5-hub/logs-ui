import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Fab } from "@material-ui/core";
import AddCardIcon from '@mui/icons-material/AddCard';

import "./datagrid.css";
import * as xlsx from "xlsx/xlsx.mjs";
import { setGlobalState, useGlobalState } from "./tableSlice";
import { useCSVReader } from "react-papaparse";
const _ = require("lodash");
const ITEM_HEIGHT = 60;

export default function FilterColumn({ title }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHideAll, setIsHideAll] = useState(false);
  const [titleFiltered, setTitleFiltered] = useState([]);
  const [clear, setClear] = useState(false);
  const [dataImport] = useGlobalState("dataImport");
  const open = Boolean(anchorEl);
  const getTitle = async () => {
    setTitleFiltered(title);
  };
  useEffect(() => {
    getTitle();
  }, []);
  const setCheckboxStatus = async () => {
    title.map(async (el) => {
      const cellContent = document.getElementsByClassName(el);
      for (let index = 0; index < cellContent.length; index++) {
        if (cellContent[index].style.display === "none") {
          document.getElementById(el).checked = true;
        }
      }
    });
  };
  const findColumn = async (e) => {
    const val = e.target.value;
    if (val === "") {
      await setTitleFiltered(title);
      setClear(false);
      await setCheckboxStatus();
    } else {
      setClear(true);
      setTitleFiltered(title.filter((e) => e.startsWith(val)));
    }
  };

  const handleClose = () => {
    getTitle();
    setAnchorEl(null);
    setClear(false);
  };

  const filterColumn = async (val) => {
    setIsHideAll(false);
    const cellContent = document.getElementsByClassName(val);
    if (document.getElementById(val).checked) {
      for (let index = 0; index < cellContent.length; index++) {
        cellContent[index].style.display = "none";
      }
      document.getElementById(`${val}-head`).style.display = "none";
    } else {
      for (let index = 0; index < cellContent.length; index++) {
        cellContent[index].style.display = "table-cell";
      }
      document.getElementById(`${val}-head`).style.display = "table-cell";
    }
  };

  const showAll = async () => {
    setIsHideAll(false);
    document.querySelector("#standard-basic").value = "";
    title.map((el) => {
      if (document.getElementById(el).checked === true) {
        document.getElementById(el).click();
      }
    });
  };
  const hideAll = async () => {
    setIsHideAll(true);
    document.querySelector("#standard-basic").value = "";
    title.map((el) => {
      if (document.getElementById(el).checked === false) {
        document.getElementById(el).click();
      }
    });
  };
  const showMenu = async (event) => {
    setAnchorEl(event.currentTarget);
    (await isHideAll) ? hideAll() : showAll();
    await setCheckboxStatus();
  };
  const formatColumn = (data) => {
    const values = Object.values(data[0]);
    const keys = Object.keys(data[0]);
    console.log("====================================");
    console.log(keys);
    console.log("====================================");
    var result = [];
    for (let index = 0; index < values.length; index++) {
      result.push({
        field: keys[index],
        headerName: `${keys[index].toUpperCase()}`,
        type: `${typeof values[index]}`,
      });
    }
    console.log("====================================");
    console.log("column", result);
    console.log("====================================");
    return result;
  };
  const formatDataImport = (data) => {
    var result = [];
    data.map((element) => {
      var { __rowNum__, ...rest } = element;
      result.push(rest);
    });
    return result;
  };
  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        console.log(formatDataImport(json));
        setGlobalState("dataImport", formatDataImport(json));
        setGlobalState("columnImport", formatColumn(formatDataImport(json)));
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={showMenu}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "33ch",
          },
        }}
      >
        <label htmlFor="upload-photo">
          <input
            style={{ display: "none" }}
            id="upload-photo"
            name="upload-photo"
            type="file"
            onChange={readUploadFile}
          />

          <Fab color="primary" size="small" component="span" aria-label="add">
            <AddCardIcon />
          </Fab>
        </label>
        <MenuItem>
          <div className="container_filter_x">
            <TextField
              id="standard-basic"
              label="Find column"
              variant="standard"
              className="search_side_menu"
              onChange={(e) => findColumn(e)}
            />
            <ul>
              {titleFiltered.map((el, i) => (
                <li key={i}>
                  <input
                    type="checkbox"
                    id={el}
                    onChange={(e) => filterColumn(el)}
                  ></input>{" "}
                  {el}
                </li>
              ))}
            </ul>
          </div>
        </MenuItem>
        <div className="container_button_filter">
          {clear ? null : (
            <Button size="small" onClick={(e) => hideAll()} variant="text">
              Hide All
            </Button>
          )}
          {clear ? null : (
            <Button size="small" onClick={(e) => showAll()} variant="text">
              Show All
            </Button>
          )}
          {clear ? (
            <Button
              size="small"
              onClick={(e) => {
                document.querySelector("#standard-basic").value = "";
                getTitle();
                setClear(false);
              }}
              variant="text"
            >
              Clear
            </Button>
          ) : null}
        </div>
      </Menu>
    </div>
  );
}
