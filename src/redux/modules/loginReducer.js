import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";
import axios from "axios";
import { apis } from "../../shared/api";
import { setAuthorizationToken } from "../../shared/setAuthorizationToken";

// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
const USERINFO = "USERINFO";

// action creators
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));
const userInfo = createAction(SET_USER, (user) => ({ user }));

// initialState
const initialState = {
  userinfo: { email: "", nickname: "" },
  token: null,
};

// middleware actions
const loginDB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    apis
      .login(id, pwd)
      .then((res) => {
        setCookie("token", res.headers["authorization"], 1);
        const token = res.headers["authorization"];
        // localStorage.setItem("authorization", token);
        // dispatch(setUser({ token: id }));
        apis
          .userInfo(res.headers["authorization"])
          .then((res) =>
            dispatch(
              setUser({
                email: res.data.username,
                nickname: res.data.nickname,
                token: token,
              })
            )
          )
          .catch((error) => console.log(error));
        history.push("/");
        // dispatch(userInfo(res.headers["authorization"], id, pwd));
      })
      .catch((error) => alert("회원정보가 일치하지 않습니다."));
  };
};

const loginCheckDB = () => {
  return function (dispatch, getState, { history }) {
    const tokenCheck = document.cookie;
    const token = tokenCheck.split("=")[1];
    // const token = tokenDummy.split("=")[1].toString();
    if (token) {
      apis
        .userInfo(token)
        .then((res) => {
          dispatch(
            setUser({
              email: res.data.username,
              nickname: res.data.nickname,
              token: token,
            })
          );
        })
        .catch((error) => console.log(error));
    }
    // const userId = localStorage.getItem("authorization");
    // const tokenCheck = document.cookie;
    // if (tokenCheck) {
    //   dispatch(setUser({ id: userId }));
    // } else {
    //   dispatch(logOut());
    // }
  };
};

const logOutDB = () => {
  return function (dispatch, getState, { history }) {
    deleteCookie("token");
    // localStorage.removeItem("authorization");
    dispatch(logOut({ userinfo: { email: "", nickname: "" }, token: null }));
    history.replace("/");
    history.go(0);
  };
};

const SignUpDB = (id, nickname, pwd, passwordcheck) => {
  return function (dispatch, getState, { history }) {
    apis
      .signup(id, nickname, pwd, passwordcheck)
      .then((res) => {
        alert("회원가입이 완료되었습니다.");
        history.push("/signin");
      })
      .catch((error) => {
        alert("회원가입에 실패했습니다.");
      });
  };
};

const userInfoDB = (token) => {
  return function (dispatch, getState, { history }) {
    apis
      .userInfo(token)
      .then((res) => {})
      .catch((error) => console.log(error));
  };
};

// reducer
// draft = state의 복제품 (불변성 유지)
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        // setCookie("is_login", "success");
        draft.token = action.payload.user.token;
        draft.userinfo = {
          email: action.payload.user.email,
          nickname: action.payload.user.nickname,
        };
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        // deleteCookie("is_login");
        draft.userinfo = null;
        draft.token = null;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
    [USERINFO]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.username = action.payload.username;
      }),
  },
  initialState
);

// action creator export

const actionCreators = {
  logOut,
  getUser,
  loginDB,
  SignUpDB,
  loginCheckDB,
  userInfoDB,
  logOutDB,
};

export { actionCreators };
