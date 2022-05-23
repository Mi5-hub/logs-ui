import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "./datagrid.css";
import { useGlobalState, setGlobalState } from "./tableSlice";
const _ = require("lodash");

const ITEM_HEIGHT = 60;

export default function EditColumn({ onDoubleClickFunction }) {
  const [anchorEl] = useGlobalState("anchorEl");
  const [valueCell] = useGlobalState("currentCellData");
  const [typeCell] = useGlobalState("currentCellType");
  const [fullData] = useGlobalState("currentCellFullData");
  const [columnField] = useGlobalState("currentCellColumn");
  const [optionSelect] = useGlobalState('optionSelect')
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setGlobalState("anchorEl", null);
  };

  const saveData = async () => {
    fullData[columnField] = valueCell;
    await onDoubleClickFunction(fullData);
    await handleClose();
  };

  return (
    <div>
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
        <MenuItem>
          <div className="container_filter_x">
            {typeCell === "datetime" ? (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                {" "}
                <DateTimePicker
                label={columnField}
                  value={valueCell}                                                                       
                  onChange={(e) => setGlobalState("currentCellData", e)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            ) : typeCell === "select" ? (
              <TextField
                id="standard-select-currency"
                style={{width:'250px'}}
                select
                label={columnField}
                value={valueCell}
                onChange={(e) =>
                  setGlobalState("currentCellData", e.target.value)
                }
                variant="standard"
              >
                {optionSelect.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                id="standard-basic"
                label={columnField}
                variant="standard"
                type={typeCell}
                className="search_side_menu"
                value={valueCell}
                onChange={(e) =>
                  setGlobalState("currentCellData", e.target.value)
                }
              />
            )}
          </div>
        </MenuItem>
        <div className="container_button_filter">
          <Button size="small" onClick={(e) => handleClose()} variant="text">
            Cancel
          </Button>
          <Button size="small" onClick={(e) => saveData()} variant="text">
            Save
          </Button>
        </div>
      </Menu>
    </div>
  );
}


