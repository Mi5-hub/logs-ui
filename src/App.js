import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import "./App.css";
import AppPagination from "./Components/Homepage/AppPagination";
import DataTable from "./Components/Homepage/DataTable";
import Table from "./Components/Homepage/Table";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Other" element={<DataTable/>} />
          <Route path="/" element={<Table/>} />
          <Route path="/pagination" element={<AppPagination/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
