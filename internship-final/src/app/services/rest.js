import axios from "axios";

const rest = axios.create({
  headers: {
    Authorization: "Basic YWRtaW46YWRtaW4=",
  },
  baseURL: "/ws/rest",
});

export default rest;
