import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { deleteCookie, setCookie } from "../../shared/Cookie";
import axios from "axios";

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
    axios({
      method: "POST",
      url: "http://3.36.65.28:8080/user/login/",

      // data: JSON.stringify({
      //   username: id,
      //   password: pwd,
      // }),

      data: {
        username: id,
        password: pwd,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(
          setUser({ email: res.data.email, nickname: res.data.nickname })
        );
        history.push("/");
      })
      .catch((error) => console.log(error));
  };
};

const SignUpDB = (id, pwd, nickname) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: "http://3.36.65.28:8080/user/login",
      data: {
        username: id,
        password: pwd,
        nickname: nickname,
      },
    })
      .then((res) => {
        alert("회원가입 성공");
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
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
