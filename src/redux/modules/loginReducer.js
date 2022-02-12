import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { deleteCookie, setCookie } from "../../shared/Cookie";
import axios from "axios";
import { apis } from "../../shared/api";
import { setAuthorizationToken } from "../../shared/setAuthorizationToken";

// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// action creators
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

// initialState
const initialState = {
  user: null,
  is_login: false,
};

// middleware actions
const loginDB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    apis
      .login(id, pwd)
      .then((res) => {
        console.log(res.headers);
        const token = res.headers["authorization"];
        localStorage.setItem("jwtToken", token);
        setAuthorizationToken(token);
      })
      .catch((error) => console.log(error));
    // apis
    //   .login(id, pwd)
    //   .then((res) => console.log(res))
    //   .catch((error) => console.log(error));
  };
};

const SignUpDB = (id, nickname, pwd, passwordcheck) => {
  return function (dispatch, getState, { history }) {
    apis
      .singup(id, nickname, pwd, passwordcheck)
      .then((res) => console.log(res, "회원가입 성공"))
      .catch((error) => console.log(error));
  };
};

// reducer
// draft = state의 복제품 (불변성 유지)
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// action creator export

const actionCreators = {
  logOut,
  getUser,
  loginDB,
  SignUpDB,
};

export { actionCreators };
