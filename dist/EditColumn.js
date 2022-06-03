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
export default function EditColumn({
  onDoubleClickFunction,
  getAllLogs
}) {
  const [anchorEl] = useGlobalState("anchorEl");
  const [valueCell] = useGlobalState("currentCellData");
  const [typeCell] = useGlobalState("currentCellType");
  const [fullData] = useGlobalState("currentCellFullData");
  const [columnField] = useGlobalState("currentCellColumn");
  const [optionSelect] = useGlobalState("optionSelect");
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setGlobalState("anchorEl", null);
  };

  const saveData = async () => {
    fullData[columnField] = valueCell;
    await onDoubleClickFunction(fullData);
    await handleClose();
    await getAllLogs();
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Menu, {
    id: "long-menu",
    MenuListProps: {
      "aria-labelledby": "long-button"
    },
    anchorEl: anchorEl,
    open: open,
    onClose: handleClose,
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5,
        width: "33ch"
      }
    }
  }, /*#__PURE__*/React.createElement(MenuItem, null, /*#__PURE__*/React.createElement("div", {
    className: "container_filter_x"
  }, typeCell === "datetime" ? /*#__PURE__*/React.createElement(LocalizationProvider, {
    dateAdapter: AdapterDateFns
  }, " ", /*#__PURE__*/React.createElement(DateTimePicker, {
    label: columnField,
    value: valueCell,
    onChange: e => setGlobalState("currentCellData", e),
    renderInput: params => /*#__PURE__*/React.createElement(TextField, params)
  })) : typeCell === "select" ? /*#__PURE__*/React.createElement(TextField, {
    id: "standard-select-currency",
    style: {
      width: "250px"
    },
    select: true,
    label: columnField,
    value: valueCell,
    onChange: e => setGlobalState("currentCellData", e.target.value),
    variant: "standard"
  }, optionSelect.map(option => /*#__PURE__*/React.createElement(MenuItem, {
    key: option,
    value: option
  }, option))) : /*#__PURE__*/React.createElement(TextField, {
    id: "standard-basic",
    label: columnField,
    variant: "standard",
    type: typeCell,
    className: "search_side_menu",
    value: valueCell,
    onChange: e => setGlobalState("currentCellData", e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "container_button_filter"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "small",
    onClick: e => handleClose(),
    variant: "text"
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    size: "small",
    onClick: e => saveData(),
    variant: "text"
  }, "Save"))));
}