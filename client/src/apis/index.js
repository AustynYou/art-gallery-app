import axios from "axios";

// instance = baseUrl만 설정돼 있고, 나머지는 axios와 똑같이 행동합니다.
// to reuse the provided configuration for all the calls
// Configuration: set default baseURL
const instance = axios.create({
  baseURL: "http://localhost:8000/",
});

export default instance;
