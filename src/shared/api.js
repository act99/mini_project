import axios from "axios";

const tokenCheck = document.cookie;
const token = tokenCheck.split("=")[1];
const api = axios.create({
  baseURL: "http://3.36.71.110",
  // baseURL: "https://3.36.65.28:8080",
  // baseURL: "https://goonzu.shop",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
    token: token,
  },
});

api.interceptors.request.use(function (config) {
  const accessToken = document.cookie.split("=")[1];
  config.headers.common["authorization"] = `${accessToken}`;
  return config;
});

export const apis = {
  login: (id, pwd) => api.post("/user/login", { username: id, password: pwd }),
  signup: (id, nickname, pwd, passwordcheck) =>
    api.post("/user/signup", {
      username: id,
      nickname: nickname,
      password: pwd,
      passwordcheck: passwordcheck,
    }),
  userInfo: (token) =>
    api.post(`/user/userinfo`, {
      authorization: token,
    }),
  add: (contents) => api.post("/api/posts", contents),
  get: () => api.get("/api/posts"),
  edit: (postID, contents) => api.put(`/api/posts/${postID}`, contents),
  delete: (postID) => api.delete(`/api/posts/${postID}`),
  imageUpload: (image) => api.post(`/api/image`, image),
  buyCount: (postId) => api.post(`/api/posts/${postId}/buycount`),
};
