import axios from "axios";

const Service = {
  getLogs: () => {
    return axios.get("http://localhost:5050/logs");
  },

  postLogs: (data) => {
    return axios.post("http://localhost:5050/logs", [data]);
  }
};
export default Service;
