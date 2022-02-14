import axios from "axios";

export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common["authorization"] = `BEARER ${token}`;
  } else {
    delete axios.defaults.headers.common["authorization"];
  }
};
