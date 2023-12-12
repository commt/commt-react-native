import axios from "axios";

// Axios Create Instance
const instance = axios.create({
  baseURL: "https://service.commt.co",
  timeout: 3000,
});

// Axios Request Interceptor
instance.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    Promise.reject(error);
  },
);

// Axios Response Interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    Promise.reject(error);
  },
);

export default instance;
