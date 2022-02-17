import axios from "axios";

const tokenCheck = document.cookie;
const token = tokenCheck.split("=")[1];
const api = axios.create({
  // 실제 베이스 유알엘
  baseURL: "http://13.125.206.220:8080",
  // baseURL: "http://3.36.71.110",
  // baseURL: "http://52.78.96.234:8080",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    // accept: "application/json,",
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
  // comment
  addComment: (postId, comment) =>
    api.post(`/api/${postId}/comments`, { comment: comment }),
  getComments: (postId) => api.get(`/api/${postId}/comments`),
  delComment: (commentId) => api.delete(`/api/comments/${commentId}`),
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
