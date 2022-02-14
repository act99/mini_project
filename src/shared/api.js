import axios from "axios";

const tokenCheck = document.cookie;
const token = tokenCheck.split("=")[1];
const api = axios.create({
  baseURL: "http://3.36.65.28:8080",

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
  // article
  // add: (contents) => api.post("/api/articles", contents),
  // edit: (id, contents) => api.put(`api/articles/${id}`, contents),
  // del: (id) => api.delete(`api/articles/${id}`),
  // articles: () => api.get("/api/articles"),
  // article: (id) => api.get(`/api/articles/${id}`),
  // search: (value) => api.get(`/api/articles/search?query=${value}`),

  // // comment
  // addComment: (id, content) =>
  //   api.post(`/api/articles/${id}/comments`, { content }),
  // comments: (id) => api.get(`/api/articles/${id}/comments`),
  // delComment: (id, coId) => api.delete(`/api/articles/${id}/comments/${coId}`),
  // editComment: (id, coId, content) =>
  //   api.put(`/api/articles/${id}/comments/${coId}`, { content }),

  // // user
  // login: (id, pw) => api.post("/user/login", { username: id, password: pw }),
  // signup: (id, email, pw, pwcheck) =>
  //   api.post("/user/signup", {
  //     username: id,
  //     email: email,
  //     password: pw,
  //     repassword: pwcheck,
  //   }),
  // userInfo: () => api.get(`/myinfo`),
  // userPassword: (pw) => api.post(`/myinfo`, pw),
  // userNewPassword: (pw) => api.put(`/myinfo`, pw),
};
