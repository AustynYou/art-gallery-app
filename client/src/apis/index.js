import axios from "axios";

const instance = axios.create({
  baseURL: "http://18.144.7.28/",
});

export default instance;
