import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import "../css/tableTailwind.css";
import axios from "axios";
const _ = require("lodash");

const ITEM_HEIGHT = 35;

export default function FilterColumn({ isClickedAll }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [title, setTitle] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(true);
  const open = Boolean(anchorEl);
  const getTitle = async () => {
    const logs = await axios.get("http://localhost:5050/logs");
    setTitle(
      _.without(
        Object.keys(logs.data[0]),
        "_id",
        "__v",
        "response",
        "createdAt",
        "updatedAt"
      )
    );
  };
  useEffect(() => {
    getTitle();
    const test = async () => {
      if (isClickedAll) {
        await document.querySelector("#long-button").click();
        title.map((val) => {
          document.getElementById(`${val}-head`).style.display = "table-cell";
        });
      
        await selectAll();
      }
    };
    test();
  }, [isClickedAll]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const filterColumn = async (val) => {
    const cellContent = document.getElementsByClassName(val);
    if (document.getElementById(val).checked) {
      document.getElementById(val).value = val;
      for (let index = 0; index < cellContent.length; index++) {
        cellContent[index].style.display = "none";
      }
      document.getElementById(`${val}-head`).style.display = "none";
      document.getElementById(val).name = val;
    } else {
      for (let index = 0; index < cellContent.length; index++) {
        cellContent[index].style.display = "table-cell";
      }
      document.getElementById(`${val}-head`).style.display = "table-cell";
      document.getElementById(val).name = "";
    }
  };
  const selectAll = async () => {
    title.map((el) => {
      if (isSelectAll) {
        if (document.getElementById(el).checked === false) {
          document.getElementById(el).click();
        }
      } else {
        if (document.getElementById(el).checked === true) {
          document.getElementById(el).click();
        }
      }
    });
    setIsSelectAll(!isSelectAll);
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
          <div className="container_filter_x">
            <button onClick={(e) => selectAll()} className="btn_select_all">
              <Icon icon="ic:baseline-menu-open" />
              {isSelectAll ? "Hide All" : "Show All"}
            </button>
            <ul>
              {title.map((el, i) => (
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
      </Menu>
    </div>
  );
}
