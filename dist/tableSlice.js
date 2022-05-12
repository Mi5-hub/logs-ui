import { createGlobalState } from "react-hooks-global-state";
const {
  setGlobalState,
  useGlobalState
} = createGlobalState({
  currentPage: 1
});
export { useGlobalState, setGlobalState };