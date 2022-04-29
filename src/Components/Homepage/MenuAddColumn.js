import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@mui/material/Button";
import "../css/tableTailwind.css";
import axios from "axios";

const ITEM_HEIGHT = 35;

export default function MenuAddColumn() {
  const [columnName, setColumnName] = useState("");
  const [columnType, setColumnType] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const postNewColumn = async () => {
    await axios.post("http://localhost:5050/logs/newColumn", {
      columnName,
      columnType,
    });
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
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
        <MenuItem>
          Column
          <input
            type="text"
            className="input_add_column"
            onChange={(e) => setColumnName(e.target.value)}
          ></input>
        </MenuItem>
        <MenuItem>
          Type
          <input
            type="text"
            className="input_add_column"
            onChange={(e) => setColumnType(e.target.value)}
          ></input>
        </MenuItem>
        <Button
          size="small"
          variant="contained"
          onClick={(e) => postNewColumn()}
          className="btn_add_column"
        >
          Create
        </Button>
      </Menu>
    </div>
  );
}
