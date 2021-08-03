import axios, { AxiosError } from "axios";

const axiosInstance = (hasAuth: boolean = false, isAdmin: boolean = false) => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  // Add a request interceptor
  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      if (hasAuth === true) {
        const accessToken = localStorage.getItem("accessToken");

        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      if (error.response) {
        if (error.response.status === 403) {
          localStorage.removeItem("accessToken");

          if (isAdmin === true) {
            window.location.replace("/admin/auth/login");
          } else {
            window.location.replace("/user/auth/login");
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

const errorHandler = (err: AxiosError) => {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx

    console.log("error-response-data", err.response.data);
    console.log("error-response-status", err.response.status);
    console.log("error-response-header", err.response.headers);
  } else if (err.request) {
    // The request was made but no response was received
    // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js

    console.log("error-request", err.request);
  } else {
    // Something happened in setting up the request that triggered an err
    console.log("error-message", err.message);
  }

  console.log("error-config", err.config);

  return err;
};

export { axiosInstance, errorHandler };
