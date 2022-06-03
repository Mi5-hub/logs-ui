import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
  currentPage: 1,
  anchorEl: null,
  currentCellData:null,
  currentCellType:'',
  currentCellFullData:null,
  currentCellColumn:'',
  optionSelect:[],
  dataImport:[],
  columnImport:[]
});

export { useGlobalState, setGlobalState };
