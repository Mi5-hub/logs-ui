import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./datagrid.css"
const _ = require("lodash");

const ITEM_HEIGHT = 60;

export default function FilterColumn({title}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHideAll, setIsHideAll] = useState(false);
  const [titleFiltered, setTitleFiltered] = useState([]);
  const [clear, setClear] = useState(false);
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
    setClear(false)
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
